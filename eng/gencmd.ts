import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Client } from '../';

const redis = new Client();
const jsonPath = resolve(__dirname, '..', 'src', 'commands.json');
const dtsPath = resolve(__dirname, '..', 'src', 'clientCommand.ts');

async function dodo() {
    const redisCommands = await redis.COMMAND<[string][]>();
    const dts = readFileSync(dtsPath).toString();
    const commands = redisCommands.map(c => {
        const cmdText = c[0];
        const reg = new RegExp(`${cmdText.toUpperCase()}(<T>)?(.*)`);
        if (!reg.test(dts)) {
            console.log(`Command '${cmdText}' is not defined in dts.`);
        }
        return c[0];
    }).sort();
    writeFileSync(jsonPath, JSON.stringify(commands, undefined, '\u0020\u0020\u0020\u0020'));
    process.exit(0);
}

dodo();