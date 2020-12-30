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
        const result = await new Promise((resolve) => {
            parser.callbacks.push((_err, reply) => {
                resolve(reply);
            });
        });
        const buffer1 = Buffer.from('*3\r\n$3\r');
        const buffer2 = Buffer.from('\nSET\r\n$5\r\nmykey\r\n$7\r\nmyvalue\r\n');
        parser.decodeReply(buffer1);
        parser.decodeReply(buffer2);
        strictEqual(result, '*3\r\n$3\r\nSET\r\n$5\r\nmykey\r\n$7\r\nmyvalue\r\n');
    });
});