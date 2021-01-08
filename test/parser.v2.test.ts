import { strictEqual } from 'assert';
import { describe, it } from 'mocha';
import parser from '../src/parser.v2';

describe('Parser.parseBulkString', () => {
    it('should return a string.', async () => {
        const buffer = Buffer.from('$6\r\nfoobar\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, 'foobar');
    });

    it('should return an empty string.', async () => {
        const buffer = Buffer.from('$0\r\n\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, '');
    });

    it('should return null.', async () => {
        const buffer = Buffer.from('$-1\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, null);
    });
});

describe('Parser.parseArray', () => {
    it('should return an array.', async () => {
        const buffer = Buffer.from('*2\r\n$3\r\nfoo\r\n$3\r\nbar\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as string[];
        strictEqual(result[0], 'foo');
    });

    it('should return null.', async () => {
        const buffer = Buffer.from('*-1\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, null);
    });
});