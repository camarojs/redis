import { EventEmitter } from 'events';
import { RedisError, VerbatimString } from './types';

class Parser extends EventEmitter {
    callbacks = new Array<(error: RedisError | undefined, reply: unknown | undefined) => void>();
    private buffer = '';
    private offset = 0;
    private parsing = false;

    get inBounds() {
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

    async decodeReply(data: Buffer) {
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
             */
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

    private async parseReply(): Promise<unknown> {
        this.parsing = true;

        const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        switch (char) {
            case '$':
                return this.parseBlobString();
            case '%':
                return this.parseMap();
            case ':':
                return this.parseNumber();
            case '*':
                return this.parseArray();
            case '+':
                return this.parseSimpleString();
            case '-':
                return this.parseSimpleError();
            case ',':
                return this.parseDouble();
            case '#':
                return this.parseBoolean();
            case '!':
                return this.parseBlobError();
            case '=':
                return this.parseVerbatimString();
            case '(':
                return this.parseBigNumber();
            case '~':
                return this.parseSet();
            case '|':
                return this.parseAttribute();
            case '>':
                return this.parsePubSub();
            case '_':
                this.offset += 2;
                return null;
            default:
                return undefined;
        }
    }

    /**
     * Get the next character synchronously and move offset.
     */
    private nextChar(): string {
        return this.buffer[this.offset++] as string;
    }

    /**
     * Get the next character asynchronously and move offset.
     */
    private nextCharAsync(): Promise<string> {
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
    private peekChar(): string {
        return this.buffer[this.offset] as string;
    }

    /**
     * Get the next character asynchronously.
     */
    private peekCharAsync(): Promise<string> {
        this.buffer = '';
        this.offset = 0;
        return new Promise((resolve) => {
            this.once('newData', () => {
                resolve(this.buffer[this.offset] as string);
            });
        });
    }

    private async parseMap() {
        const length = await this.parseNumber();
        const map = new Map();
        for (let i = 0; i < length; i++) {
            const key = await this.parseReply();
            const value = await this.parseReply();
            map.set(key, value);
        }
        return map;
    }

    private async parseBlobString() {
        let result = '';
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();

        let length: number;
        if (char === '?') { // stream string
            this.offset += 4; // skip '?\r\n;'
            length = await this.parseNumber();
            while (length !== 0) {
                for (let i = 0; i < length; i++) {
                    char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
                    result += char;
                }
                this.offset += 3;
                length = await this.parseNumber();
            }
        } else { // common string
            length = await this.parseNumber();
            for (let i = 0; i < length; i++) {
                char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
                result += char;
            }
        }
        // skip the ending '\r\n'
        this.offset += 2;
        return result;
    }

    private async parseNumber() {
        let result = 0;
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();

        while (char !== '\r') {
            result = result * 10 + ((char as unknown as number) - ('0' as unknown as number));
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        // skip '\r\n'
        this.offset++;
        return result;
    }

    private async parseArray() {
        const length = await this.parseNumber();
        const array = [];
        for (let i = 0; i < length; i++) {
            const elem = (await this.parseReply()) as unknown;
            array.push(elem);
        }
        return array;
    }

    private async parseSimpleString() {
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

    private async parseSimpleError() {
        let msg = '';
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();

        while (char !== '\r') {
            msg += char;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        return new RedisError(msg);
    }

    private async parseDouble() {
        let result = '';
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();

        while (char !== '\r') {
            result += char;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        this.offset++;
        return parseFloat(result);
    }

    private async parseBoolean() {
        const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        this.offset += 2;
        return char === 't';
    }

    private async parseBlobError() {
        const code = await this.parseNumber();
        let msg = '';
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        while (char !== '\r') {
            msg += char;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        return new RedisError(msg, code);
    }

    private async parseVerbatimString() {
        const length = await this.parseNumber();
        let result = '';
        let format = '';
        for (let i = 0; i < length; i++) {
            const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
            // the fourth byte is always ':'
            if (i < 3) {
                format += char;
            } else if (i > 3) {
                result += char;
            }
        }
        return new VerbatimString(format, result);
    }

    private async parseBigNumber() {
        let result = '';
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        while (char !== '\r') {
            result += char;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        this.offset++;
        return BigInt(result);
    }

    private async parseSet() {
        const length = await this.parseNumber();
        const result = new Set();
        for (let i = 0; i < length; i++) {
            const elem = await this.parseReply();
            result.add(elem);
        }
        return result;
    }

    private async parseAttribute() {
        /**
         * Attribute type, just discard it.
         * 
         * Is there a real need for the attribute type? 
         * https://github.com/antirez/RESP3/issues/20#issuecomment-583073317
         */
        await this.parseMap();
        return this.parseReply();
    }

    private async parsePubSub() {
        const length = await this.parseNumber();
        const message = [];
        for (let i = 0; i < length; i++) {
            const tmp = await this.parseReply();
            message.push(tmp);
        }
        this.emit('message', message);
    }
}

export default new Parser();