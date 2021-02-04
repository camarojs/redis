import { EventEmitter } from 'events';
import { RedisError } from './types';

export default abstract class BaseParser extends EventEmitter {
    constructor(
        private readonly protover: 2 | 3
    ) {
        super();
    }

    callbacks = new Array<(error: RedisError | undefined, reply: unknown | undefined) => void>();
    buffer = '';
    offset = 0;
    parsing = false;

    get inBounds(): boolean {
        return this.offset < this.buffer.length;
    }

    encodeCommand(command: string, args?: string[]): string {
        const result = [];
        result.push('*', args ? args.length + 1 : 1, '\r\n');
        result.push('$', command.length, '\r\n');
        result.push(command, '\r\n');

        args?.forEach(arg => {
            result.push('$', arg.length, '\r\n');
            result.push(arg, '\r\n');
        });

        return result.join('');
    }

    async decodeReply(data: Buffer): Promise<void> {
        this.buffer += data.toString();
        this.emit('newData');
        if (this.parsing) {
            return;
        }

        let reply = await this.parseReply();
        while (reply !== undefined) {
            const cb = this.callbacks.shift();

            if (cb) {
                if (reply instanceof RedisError) {
                    cb(reply, undefined);
                } else {
                    cb(undefined, reply);
                }
            }

            /**
             * When the array is emptied but there is unprocessed data in the buffer,
             * there may be pubsub data.
             * And if the protover is 2, we should return pubsub data.
             */
            if (this.callbacks.length === 0 && this.protover === 2) {
                this.emit('message', reply);
            }

            if (this.callbacks.length === 0 && (!this.inBounds)) {
                break;
            }

            reply = await this.parseReply();
        }

        this.reset();
    }

    /**
     * Reset parser status.
     */
    private reset() {
        this.buffer = '';
        this.offset = 0;
        this.parsing = false;
    }

    /**
     * Get the next character synchronously and move offset.
     */
    nextChar(): string {
        return this.buffer[this.offset++] as string;
    }

    /**
     * Get the next character asynchronously and move offset.
     */
    nextCharAsync(): Promise<string> {
        this.buffer = '';
        this.offset = 0;
        return new Promise((resolve) => {
            this.once('newData', () => {
                resolve(this.buffer[this.offset++] as string);
            });
        });
    }

    /**
     * Get the next character synchronously.
     */
    peekChar(): string {
        return this.buffer[this.offset] as string;
    }

    /**
     * Get the next character asynchronously.
     */
    peekCharAsync(): Promise<string> {
        this.buffer = '';
        this.offset = 0;
        return new Promise((resolve) => {
            this.once('newData', () => {
                resolve(this.buffer[this.offset] as string);
            });
        });
    }

    abstract parseReply(): Promise<unknown>;

    async parseSimpleString(): Promise<string> {
        let result = '';
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();

        while (char !== '\r') {
            result += char;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        // skip '\r\n'
        this.offset++;
        return result;
    }

    async parseSimpleError(): Promise<RedisError> {
        const msg = await this.parseSimpleString();
        return new RedisError(msg);
    }

    async parseNumber(): Promise<number> {
        let result = 0;
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        let sign = false;
        if (char === '-') {
            sign = true;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        while (char !== '\r') {
            result = result * 10 + ((char as unknown as number) - ('0' as unknown as number));
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        // skip '\r\n'
        this.offset++;
        return sign ? -result : result;
    }
}