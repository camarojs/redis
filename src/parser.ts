import { EventEmitter } from 'events';

class Parser extends EventEmitter {
    callbacks = new Array<(error: string | undefined, reply: unknown | undefined) => void>();
    private buffer = '';
    private offset = 0;
    private parsing = false;

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
        while (reply) {
            const cb = this.callbacks.shift();

            if (cb) {
                const preStr = 'ERR ';
                if (typeof reply === 'string' && reply.startsWith(preStr)) {
                    cb(reply.replace(preStr, ''), undefined);
                } else {
                    cb(undefined, reply);
                }
            }

            if (this.callbacks.length === 0) {
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

    private async parseReply() {
        this.parsing = true;
        let char: string;
        if (this.offset < this.buffer.length) {
            char = this.nextChar();
        } else {
            char = await this.nextCharAsync();
        }

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
            default:
                return null;
        }
    }

    /**
     * Get the next character synchronously,
     * should judge whether the offset is less than the length of the buffer.
     */
    private nextChar(): string {
        return this.buffer[this.offset++] as string;
    }

    /**
     * Get the next character asynchronously,
     * should judge whether the offset is large equal than the length of the buffer.
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
        const length = await this.parseNumber();
        let result = '';
        for (let i = 0; i < length; i++) {
            let char: string;
            if (this.offset < this.buffer.length) {
                char = this.nextChar();
            } else {
                char = await this.nextCharAsync();
            }
            // TODO: handle special characters like: 
            result += char;
        }
        // skip '\r\n'
        this.offset = this.offset + 2;
        return result;
    }

    private async parseNumber() {
        let result = 0;
        let char: string;
        if (this.offset < this.buffer.length) {
            char = this.nextChar();
        } else {
            char = await this.nextCharAsync();
        }

        while (char !== '\r') {
            result = result * 10 + ((char as unknown as number) - ('0' as unknown as number));
            if (this.offset < this.buffer.length) {
                char = this.nextChar();
            } else {
                char = await this.nextCharAsync();
            }
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
        let char: string;
        if (this.offset < this.buffer.length) {
            char = this.nextChar();
        } else {
            char = await this.nextCharAsync();
        }

        while (char !== '\r') {
            result += char;
            if (this.offset < this.buffer.length) {
                char = this.nextChar();
            } else {
                char = await this.nextCharAsync();
            }
        }
        // skip '\r\n'
        this.offset++;
        return result;
    }

    private async parseSimpleError() {
        let msg = '';
        let char: string;
        if (this.offset < this.buffer.length) {
            char = this.nextChar();
        } else {
            char = await this.nextCharAsync();
        }

        while (char !== '\r') {
            msg += char;
            if (this.offset < this.buffer.length) {
                char = this.nextChar();
            } else {
                char = await this.nextCharAsync();
            }
        }
        return msg;
    }
}

export default new Parser();