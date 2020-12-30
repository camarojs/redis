import axios from 'axios';
import { parse } from 'node-html-parser';
import fs from 'fs';
import { JsonCommand } from './../src/client';

async function dodo() {
    const res = await axios.get('https://redis.io/commands');
    const html = await res.data;
    const root = parse(html);
    const commands = {} as JsonCommand;
    root.querySelectorAll('#commands li a')
        .map(e => e.childNodes.filter(cn => cn.nodeType === 1))
        .forEach(node => {
            const command = node[0]?.childNodes[0]?.rawText.trim() as string;
            const args = node[0]?.childNodes[1]?.childNodes[0]?.rawText.trim().split(/(\n| )+/).join('') || undefined;
            const summary = node[1]?.childNodes[0]?.rawText.trim() as string;
            commands[command] = { args, summary };
        });

    generateCommandJson(commands);
    generateTypescriptInterface();
}

const result = new Array<string>();
const tab = '\u0020\u0020\u0020\u0020';
const jsonPath = './src/commands.json';

function generateCommandJson(commands: JsonCommand) {
    const rawData = JSON.parse(fs.readFileSync(jsonPath).toString()) as JsonCommand;
    Object.entries(commands).forEach(([command, attr]) => {
        rawData[command] = Object.assign({}, rawData[command], attr);
    });
    fs.writeFileSync(jsonPath, JSON.stringify(rawData, undefined, tab));
}

function generateTypescriptInterface() {
    const rawData = JSON.parse(fs.readFileSync(jsonPath).toString()) as JsonCommand;
    appendHeader();
    result.push('export interface IClientCommand {\n');
    Object.entries(rawData).forEach(([command, attr]) => {
        appendComment(attr);
        appendMethod(command, attr);
    });

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

function appendComment(attr: JsonCommand[keyof JsonCommand]) {
    result.push(`${tab}/**\n`);
    result.push(`${tab}\u0020*\u0020${attr.summary}\n`);
    if (attr.args) {
        result.push(`${tab}\u0020*\u0020@param\u0020args\u0020${attr.args}\n`);
    }
    result.push(`${tab}\u0020*/\n`);
}

function appendMethod(command: string, attr: JsonCommand[keyof JsonCommand]) {
    result.push(`${tab}${command.replace(/( |-)/g, '')}(`);
    if (attr.args) {
        result.push('...args: string[]');
    }
    const type = attr.returnType ?? 'void';
    result.push(`)${type === 'T' ? '<T>' : ''}: Promise<${type}>;\n`);
}

dodo();