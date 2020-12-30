import { EventEmitter } from 'events';

class Parser extends EventEmitter {
    callbacks = new Array<(error: Error | undefined, reply: unknown) => void>();
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
        this.emit('newDate');
        if (this.parsing) {
            return;
        }

        let reply = await this.parseReply();
        while (reply) {
            const cb = this.callbacks.shift();
            if (cb) {
                cb(undefined, reply);
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
    }

    private async parseReply() {
        const tmp = this.nextChar();
        let char: string;
        if (typeof (tmp as Promise<string>).then === 'function') {
            char = await tmp;
        } else {
            char = tmp as string;
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
            default:
                console.log(char);
                return null;
        }
    }

    private nextChar(): string | Promise<string> {
        if (this.offset < this.buffer.length) {
            return this.buffer[this.offset++] as string;
        } else {
            this.buffer = '';
            this.offset = 0;
            return new Promise((resolve) => {
                this.once('newData', () => {
                    resolve(this.buffer[this.offset++] as string);
                });
            });
        }
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
            const tmp = this.nextChar();
            let char: string;
            if (typeof (tmp as Promise<string>).then === 'function') {
                char = await tmp;
            } else {
                char = tmp as string;
            }
            result += char;
        }
        // skip '\r\n'
        this.offset = this.offset + 2;
        return result;
    }

    private async parseNumber() {
        let result = 0;
        let tmp = this.nextChar();
        let char: string;
        if (typeof (tmp as Promise<string>).then === 'function') {
            char = await tmp;
        } else {
            char = tmp as string;
        }

        while (char !== '\r') {
            result = result * 10 + ((char as unknown as number) - ('0' as unknown as number));
            tmp = this.nextChar();
            if (typeof (tmp as Promise<string>).then === 'function') {
                char = await tmp;
            } else {
                char = tmp as string;
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
}

export default new Parser();