import { strictEqual } from 'assert';
import { describe, it } from 'mocha';
import { RedisError, VerbatimString } from '../src/types';
import Parser from '../src/parser/parser.v3';

const parser = new Parser();

describe('Parser.encodeCommand', () => {
    it('should be encoded correctly.', () => {
        strictEqual(
            parser.encodeCommand('SET', ['mykey', 'myvalue']),
            '*3\r\n$3\r\nSET\r\n$5\r\nmykey\r\n$7\r\nmyvalue\r\n'
        );
    });
});

// sticky packet
describe('Parser.decodeReply', () => {
    it('should be able to handle sticky packets correctly.', async () => {
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
    it('should return an RedisError without code.', async () => {
        const buffer = Buffer.from('-ERR this is the error description\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err) => {
                resolve(_err);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as RedisError;
        strictEqual(result.message, 'ERR this is the error description');
        strictEqual(result.code, undefined);
    });
});

describe('Parser.parseBlobString', () => {
    // common string
    it('should return a string.', async () => {
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
    // empty string
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
    // streamed string
    it('should decode streamed string correctly.', async () => {
        const buffer = Buffer.from('$?\r\n;4\r\nHell\r\n;5\r\no wor\r\n;2\r\nld\r\n;0\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as string;
        strictEqual(result, 'Hello world');
    });
});

describe('Parser.parseMap', () => {
    it('should return a map', async () => {
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

    it('should decode streamed map correctly.', async () => {
        const buffer = Buffer.from('%?\r\n+a\r\n:1\r\n+b\r\n:2\r\n.\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Map<string, number>;
        strictEqual(result.get('a'), 1);
        strictEqual(result.get('b'), 2);
    });
});

describe('Parser.parseArray', () => {
    it('should return an array', async () => {
        const buffer = Buffer.from('*3\r\n:1\r\n:2\r\n:-3\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Array<number>;
        strictEqual(result[0], 1);
        strictEqual(result[2], -3);
    });

    it('should decode streamed array correctly.', async () => {
        const buffer = Buffer.from('*?\r\n:1\r\n:2\r\n:3\r\n.\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Array<number>;
        strictEqual(result[0], 1);
        strictEqual(result[2], 3);
    });
});

describe('Parser.parseDouble', () => {
    it('should return a floating point number.', async () => {
        const buffer = Buffer.from(',-1.23\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, -1.23);
    });
});

describe('Parser.parseBoolean', () => {
    it('should return a boolean.', async () => {
        const buffer = Buffer.from('#t\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = await p;
        strictEqual(result, true);
    });
});

describe('Parser.parseBlobError', () => {
    it('should return a RedisError with code', async () => {
        const buffer = Buffer.from('!21\r\nSYNTAX invalid syntax\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err) => {
                resolve(_err);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as RedisError;
        strictEqual(result.message, 'SYNTAX invalid syntax');
        strictEqual(result.code, 21);
    });
});

describe('Parser.parseVerbatimString', () => {
    it('should return a VerbatimString', async () => {
        const buffer = Buffer.from('=15\r\ntxt:Some string\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as VerbatimString;
        strictEqual(result.format, 'txt');
        strictEqual(result.toString(), 'Some string');
    });
});

describe('Parser.parseBigNumber', () => {
    it('should return a BigInt.', async () => {
        const buffer = Buffer.from('(-3492890328409238509324850943850943825024385\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as BigInt;
        strictEqual(result, BigInt('-3492890328409238509324850943850943825024385'));
    });
});

describe('Parser.parseSet', () => {
    it('should return a set.', async () => {
        const buffer = Buffer.from('~5\r\n+orange\r\n+apple\r\n#t\r\n:100\r\n:999\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Set<unknown>;
        strictEqual(result.has('apple'), true);
        strictEqual(result.has(100), true);
    });
    it('should decode streamed set correctly.', async () => {
        const buffer = Buffer.from('~?\r\n:1\r\n:2\r\n:3\r\n.\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Set<unknown>;
        strictEqual(result.has(1), true);
        strictEqual(result.has(3), true);
    });
});

describe('Parser.parseAttribute', () => {
    it('should discard attribute type.', async () => {
        const buffer = Buffer.from('|1\r\n+key-popularity\r\n%2\r\n$1\r\na\r\n,0.1923\r\n$1\r\nb\r\n,0.0012\r\n*2\r\n:2039123\r\n:9543892\r\n');
        const p = new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Array<number>;
        strictEqual(result[0], 2039123);
        strictEqual(result[1], 9543892);
    });
});

describe('Parser.parsePubSub', () => {
    it('should receive pubsub message.', async () => {
        const buffer = Buffer.from('$9\r\nGet-Reply\r\n>4\r\n+pubsub\r\n+message\r\n+somechannel\r\n+this is the message\r\n');
        const p = new Promise((resolve) => {
            parser.on('message', (data) => {
                resolve(data);
            });
        });
        parser.decodeReply(buffer);
        const result = (await p) as Array<number>;
        strictEqual(result[0], 'pubsub');
    });
});

describe('Parser.parseNull', () => {
    it('should return null.', async () => {
        const buffer = Buffer.from('_\r\n');
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
