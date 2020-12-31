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
        }, 100);
        setTimeout(() => {
            parser.decodeReply(buffer1);
        }, 200);
        setTimeout(() => {
            parser.decodeReply(buffer2);
        }, 300);

        const result1 = await p1;
        const result2 = await p2;
        strictEqual(result1, 'hello world');
        strictEqual(result2, 'hello world');
    });
});