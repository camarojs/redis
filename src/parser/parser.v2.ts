import BaseParser from './baseParser';

class Parser extends BaseParser {
    constructor() {
        super(2);
    }
    
    async parseReply(): Promise<unknown> {
        this.parsing = true;

        const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        switch (char) {
            case '+':
                return this.parseSimpleString();
            case '-':
                return this.parseSimpleError();
            case ':':
                return this.parseNumber();
            case '$':
                return this.parseBulkString();
            case '*':
                return this.parseArray();
            default:
                return undefined;
        }
    }

    private async parseBulkString() {
        let result = '';
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const length = await this.parseNumber();

        if (length === -1) {
            return null;
        }

        for (let i = 0; i < length; i++) {
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
            result += char;
        }

        this.offset += 2;
        return result;
    }

    private async parseArray() {
        const length = await this.parseNumber();
        if (length === -1) {
            return null;
        }

        const array = [];

        for (let i = 0; i < length; i++) {
            array.push(await this.parseReply());
        }

        return array;
    }
}

export default Parser;