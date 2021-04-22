import { EventEmitter } from 'events';
import { ProtoVer, RedisError } from '../types';

export default abstract class BaseParser extends EventEmitter {
    constructor(
        private readonly protover: ProtoVer
    ) {
        super();
    }

    callbacks = new Array<(error: RedisError | undefined, reply: unknown | undefined) => void>();
    buffer: number[] = [];
    offset = 0;
    parsing = false;

    get inBounds(): boolean {
        return this.offset < this.buffer.length;
    }

    /**
     * Convert command to resp string.
     * @param command Redis command.
     * @param args Redis command args.
     */
    encodeCommand(command: string, args?: string[]): string {
        const result = [];
        result.push('*', args ? args.length + 1 : 1, '\r\n');
        // If the command contains only letters,
        // the length of the command string is the same as the length of the Buffer 
        result.push('$', command.length, '\r\n');
        result.push(command, '\r\n');

        args?.forEach(arg => {
            // The length of the buffer 
            result.push('$', Buffer.from(arg).length, '\r\n');
            result.push(arg, '\r\n');
        });

        return result.join('');
    }

    async decodeReply(data: Buffer): Promise<void> {
        this.buffer.push(...data);
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
        this.buffer = [];
        this.offset = 0;
        this.parsing = false;
    }

    /**
     * Get the next character synchronously and move offset.
     */
    nextChar(): number {
        return this.buffer[this.offset++] as number;
    }

    /**
     * Get the next character asynchronously and move offset.
     */
    nextCharAsync(): Promise<number> {
        this.buffer = [];
        this.offset = 0;
        return new Promise((resolve) => {
            this.once('newData', () => {
                resolve(this.buffer[this.offset++] as number);
            });
        });
    }

    /**
     * Get the next character synchronously.
     */
    peekChar(): number {
        return this.buffer[this.offset] as number;
    }

    /**
     * Get the next character asynchronously.
     */
    peekCharAsync(): Promise<number> {
        this.buffer = [];
        this.offset = 0;
        return new Promise((resolve) => {
            this.once('newData', () => {
                resolve(this.buffer[this.offset] as number);
            });
        });
    }

    abstract parseReply(): Promise<unknown>;

    async parseSimpleString(): Promise<string> {
        const result: number[] = [];
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();

        while (char !== 13) { // '\r'
            result.push(char);
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        // skip '\r\n'
        this.offset++;
        return Buffer.from(result).toString();
    }

    async parseSimpleError(): Promise<RedisError> {
        const msg = await this.parseSimpleString();
        return new RedisError(msg);
    }

    async parseNumber(): Promise<number> {
        let result = 0;
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        let sign = false;
        if (char === 45) { // '-'
            sign = true;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        while (char !== 13) { // '\r'
            result = result * 10 + (char - 48); // '0'
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        // skip '\r\n'
        this.offset++;
        return sign ? -result : result;
    }
}