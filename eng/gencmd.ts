import axios from 'axios';
import { parse, Node } from 'node-html-parser';
import fs from 'fs';

interface Command {
    command: string;
    args: string | null;
    summary: string;
}

async function dodo() {
    const res = await axios.get('https://redis.io/commands');
    const html = await res.data;
    const root = parse(html);
    const commands = root.querySelectorAll('#commands li a')
        .map(e => e.childNodes.filter(cn => cn.nodeType === 1))
        .map(e => handleHTMLElement(e));

    fs.writeFileSync('./src/commands.json', JSON.stringify(commands));
    generateTypescriptInterface(commands);
}

function handleHTMLElement(datas: Node[]) {
    const command = datas[0]?.childNodes[0]?.rawText.trim();
    const args = datas[0]?.childNodes[1]?.childNodes[0]?.rawText.trim().split(/(\n| )+/).join('') || null;
    const summary = datas[1]?.childNodes[0]?.rawText.trim();
    return {
        command,
        args,
        summary
    } as Command;
}

const result = new Array<string>();
const tab = '\u0020\u0020\u0020\u0020';

function generateTypescriptInterface(commands: Command[]) {
    appendHeader();
    result.push('export interface ClientCommand {\n');
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i] as Command;
        appendComment(command);
        appendMethod(command);
    }
    result.push('}');
    fs.writeFileSync('./src/clientCommand.ts', result.join(''));
}

function appendHeader() {
    result.push('/**\n');
    result.push(`\u0020*\u0020Automatically generated on ${new Date()}\n`);
    result.push('\u0020*/\n');
    result.push('\n');

    result.push('/* eslint-disable @typescript-eslint/no-explicit-any */\n');
}

function appendComment(command: Command) {
    result.push(`${tab}/**\n`);
    result.push(`${tab}\u0020*\u0020${command.summary}\n`);
    if (command.args !== null) {
        result.push(`${tab}\u0020*\u0020@param\u0020args\u0020${command.args}\n`);
    }
    result.push(`${tab}\u0020*/\n`);
}

function appendMethod(command: Command) {
    result.push(`${tab}${command.command.replace(/( |-)/g, '')}<T>(`);
    if (command.args !== null) {
        result.push('...args: any');
    }
    result.push('): Promise<T>;\n');
}

dodo();