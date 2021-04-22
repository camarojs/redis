import BaseParser from './baseParser';

class Parser extends BaseParser {
    constructor() {
        super(2);
    }

    async parseReply(): Promise<unknown> {
        this.parsing = true;

        const char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
        switch (char) {
            case 43: // '+'
                return this.parseSimpleString();
            case 45: // '-'
                return this.parseSimpleError();
            case 58: // ':'
                return this.parseNumber();
            case 36: // '$'
                return this.parseBulkString();
            case 42: // '*'
                return this.parseArray();
            default:
                return undefined;
        }
    }

    private async parseBulkString() {
        const result: number[] = [];
        let char = this.inBounds ? this.peekChar() : await this.peekCharAsync();
        const length = await this.parseNumber();

        if (length === -1) {
            return null;
        }

        for (let i = 0; i < length; i++) {
            char = this.inBounds ? this.nextChar() : await this.nextCharAsync();
            result.push(char);
        }

        this.offset += 2;
        return Buffer.from(result).toString();
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