import BaseParser from './baseParser';
import { RedisError, VerbatimString } from '../types';

class Parser extends BaseParser {
    constructor() {
        super(3);
    }

    async parseReply(): Promise<unknown> {
        this.parsing = true;

        const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        switch (char) {
            case 36: // '$'
                return this.parseBlobString();
            case 37: // '%'
                return this.parseMap();
            case 58: // ':'
                return this.parseNumber();
            case 42: // '*'
                return this.parseArray();
            case 43: // '+'
                return this.parseSimpleString();
            case 45: // '-'
                return this.parseSimpleError();
            case 44: // ','
                return this.parseDouble();
            case 35: // '#'
                return this.parseBoolean();
            case 33: // '!'
                return this.parseBlobError();
            case 61: // '='
                return this.parseVerbatimString();
            case 40: // '('
                return this.parseBigNumber();
            case 126: // '~'
                return this.parseSet();
            case 124: // '|'
                return this.parseAttribute();
            case 62: // '>'
                return this.parsePubSub();
            case 95: // '_'
                return this.parseNull();
            default:
                return undefined;
        }
    }

    private async parseMap() {
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const map = new Map();
        if (char === 63) { // '?'
            this.offset += 3; // skip '?\r\n'
            char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            while (char !== 46) { // '.'
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
        const result: number[] = [];
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();

        let length: number;
        if (char === 63) { // '?' stream string
            this.offset += 4; // skip '?\r\n;'
            length = await this.parseNumber();
            while (length !== 0) {
                for (let i = 0; i < length; i++) {
                    char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
                    result.push(char);
                }
                this.offset += 3;
                length = await this.parseNumber();
            }
        } else { // common string
            length = await this.parseNumber();
            for (let i = 0; i < length; i++) {
                char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
                result.push(char);
            }
        }
        // skip the ending '\r\n'
        this.offset += 2;
        return Buffer.from(result).toString();
    }

    private async parseArray() {
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const array = [];
        if (char === 63) { // '?'
            this.offset += 3; // skip '?\r\n'
            char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            while (char !== 46) { // '.'
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
        const result: number[] = [];
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        if (char === 45) { // '-'
            result.unshift(45);
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        while (char !== 13) { // '\r'
            result.push(char);
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        this.offset++;
        return parseFloat(Buffer.from(result).toString());
    }

    private async parseBoolean() {
        const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        this.offset += 2;
        return char === 116; // 't'
    }

    private async parseBlobError() {
        const code = await this.parseNumber();
        const msg: number[] = [];
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        while (char !== 13) { // '\r'
            msg.push(char);
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }

        return new RedisError(Buffer.from(msg).toString(), code);
    }

    private async parseVerbatimString() {
        const length = await this.parseNumber();
        const result: number[] = [];
        const format: number[] = [];
        for (let i = 0; i < length; i++) {
            const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
            // the fourth byte is always ':'
            if (i < 3) {
                format.push(char);
            } else if (i > 3) {
                result.push(char);
            }
        }
        return new VerbatimString(Buffer.from(format).toString(), Buffer.from(result).toString());
    }

    private async parseBigNumber() {
        const result: number[] = [];
        let char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        if (char === 45) { // '-'
            result.unshift(45);
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        while (char !== 13) { // '\r'
            result.push(char);
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        }
        this.offset++;
        return BigInt(Buffer.from(result).toString());
    }

    private async parseSet() {
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const set = new Set();
        if (char === 63) { // '?'
            this.offset += 3; // skip '?\r\n'
            char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
            while (char !== 46) { // '.'
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

export default Parser;