import { strictEqual } from 'assert';
import { describe, it } from 'mocha';
import parser from '../src/parser';


describe('Parser.encodeCommand', () => {
    it('should be strict equal', () => {
        strictEqual(
            parser.encodeCommand('SET', ['mykey', 'myvalue']),
            '*3\r\n$3\r\nSET\r\n$5\r\nmykey\r\n$7\r\nmyvalue\r\n'
        );
    });
});

// sticky packet
describe('Parser.decodeReply', () => {
    it('should be strict equal', async () => {
        const p1 = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        const p2 = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });

        const buffer1 = Buffer.from('+hello');
        const buffer2 = Buffer.from(' world\r\n');

        setTimeout(() => {
            parser.decodeReply(buffer1);
        }, 0);
        setTimeout(() => {
            parser.decodeReply(buffer2);
        }, 10);
        setTimeout(() => {
            parser.decodeReply(buffer1);
        }, 20);
        setTimeout(() => {
            parser.decodeReply(buffer2);
        }, 30);

        const result1 = await p1;
        const result2 = await p2;
        strictEqual(result1, 'hello world');
        strictEqual(result2, 'hello world');
    });
});

describe('Parser.parseSimpleError', () => {
    it('should be strict equal', async () => {
        const buffer = Buffer.from('-ERR wrong number of arguments for \'get\' command\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err) => {
                resolve(_err);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, 'wrong number of arguments for \'get\' command');
    });
});

describe('Parser.parseBlobString', () => {
    it('should be strict equal', async () => {
        const buffer = Buffer.from('$11\r\nhello world\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, 'hello world');
    });
});

describe('Parser.parseMap', () => {
    it('should be strict equal', async () => {
        const buffer = Buffer.from('%2\r\n+first\r\n:1\r\n+second\r\n:2\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Map<string, number>;
        strictEqual(result.get('first'), 1);
        strictEqual(result.get('second'), 2);
    });
});

describe('Parser.parseArray', () => {
    it('should be strict equal', async () => {
        const buffer = Buffer.from('*3\r\n:1\r\n:2\r\n:3\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Array<number>;
        strictEqual(result[0], 1);
        strictEqual(result[1], 2);
        strictEqual(result[2], 3);
    });
});