import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { ClientV3 } from '../';

const jsonPath = resolve(__dirname, '..', 'src', 'command', 'commands.json');
const dtsPath = resolve(__dirname, '..', 'src', 'command', 'baseCommand.ts');
const dtsPathV2 = resolve(__dirname, '..', 'src', 'command', 'command.v2.ts');
const dtsPathV3 = resolve(__dirname, '..', 'src', 'command', 'command.v3.ts');

const dtsBase = readFileSync(dtsPath).toString();
const dtsV2 = readFileSync(dtsPathV2).toString();
const dtsV3 = readFileSync(dtsPathV3).toString();

const redis = new ClientV3();

const notInCommands = ['zscan', 'quit'];

async function dodo() {
    const redisCommands = await redis.COMMAND<[string][]>();
    const commands = redisCommands.filter(rc => rc instanceof Array).map(rc => rc[0]);
    commands.push(...notInCommands);
    commands.sort();
    writeFileSync(jsonPath, JSON.stringify(commands, undefined, '\u0020\u0020\u0020\u0020'));

    commands.forEach(cmdText => {
        checkDTS(cmdText);
    });
    process.exit(0);
}

function checkDTS(cmdText: string) {
    const reg = new RegExp(`${cmdText.toUpperCase()}(<T>)?(.*)`);
    if (!reg.test(dtsBase)) {
        if (!reg.test(dtsV2) || !reg.test(dtsV3)) {
            console.log(`Command '${cmdText}' is not defined in dts.`);
        }
    }
}

dodo();