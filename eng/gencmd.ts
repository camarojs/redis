import axios from 'axios';
import { parse, Node } from 'node-html-parser';

interface Commands {
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

    convertCommandsToTypeScript(commands);
}

function handleHTMLElement(datas: Node[]) {
    const command = datas[0]?.childNodes[0]?.rawText.trim();
    const args = datas[0]?.childNodes[1]?.childNodes[0]?.rawText.trim().split(/(\n| )+/).join('') || null;
    const summary = datas[1]?.childNodes[0]?.rawText.trim();
    return {
        command,
        args,
        summary
    } as Commands;
}

function convertCommandsToTypeScript(commands: Commands[]) {
    console.log(commands);
}

dodo();