import BaseParser from './baseParser';
import { RedisError, VerbatimString } from './types';

class Parser extends BaseParser {
    async parseReply(): Promise<unknown> {
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
                return this.parseNull();
            default:
                return undefined;
        }
    }

    private async parseMap() {
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const map = new Map();
        if (char === '?') {
            this.offset += 3; // skip '?\r\n'
            char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            while (char !== '.') {
                const key = await this.parseReply();
                const value = await this.parseReply();
                map.set(key, value);
                char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            }
            // skip the ending '.\r\n'
            this.offset += 3;
        } else {
            const length = await this.parseNumber();
            for (let i = 0; i < length; i++) {
                const key = await this.parseReply();
                const value = await this.parseReply();
                map.set(key, value);
            }
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

    private async parseArray() {
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const array = [];
        if (char === '?') {
            this.offset += 3; // skip '?\r\n'
            char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            while (char !== '.') {
                array.push(await this.parseReply());
                char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            }
            this.offset += 3; // skip '.\r\n'
        } else {
            const length = await this.parseNumber();
            for (let i = 0; i < length; i++) {
                array.push(await this.parseReply());
            }
        }
        return array;
    }

    private async parseDouble() {
        let result = '';
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        if (char === '-') {
            result = '-' + result;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

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
        if (char === '-') {
            result = '-' + result;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        while (char !== '\r') {
            result += char;
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        this.offset++;
        return BigInt(result);
    }

    private async parseSet() {
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const set = new Set();
        if (char === '?') {
            this.offset += 3; // skip '?\r\n'
            char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            while (char !== '.') {
                set.add(await this.parseReply());
                char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            }
            this.offset += 3; // skip '.\r\n'
        } else {
            const length = await this.parseNumber();
            for (let i = 0; i < length; i++) {
                set.add(await this.parseReply());
            }
        }
        return set;
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

    private parseNull() {
        this.offset += 2;
        return null;
    }
}

export default new Parser();