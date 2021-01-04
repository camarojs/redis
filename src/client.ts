import { Socket } from 'net';
import { IClientCommand } from './clientCommand';
import commands from './commands.json';
import parser from './parser';

export interface IClientOptions {
    host?: string;
    port?: number;
    auth?: string;
    protover?: '2' | '3';
}

export interface Client extends IClientCommand {
    options: IClientOptions
}

export interface JsonCommand {
    [x: string]: {
        args?: string;
        summary: string;
        returnType?: string;
    }
}

export class Client implements Client {
    private socket = new Socket();
    constructor(
        public options: IClientOptions = {}
    ) {
        Object.entries(commands as JsonCommand).forEach(([command, attr]) => {
            this.addCommand(command, attr);
        });
        this.initOptions(options);
        this.connect();
    }

    private connect(): void {
        this.socket.connect(
            this.options.port as number,
            this.options.host as string
        );
        this.socket.setKeepAlive(true);
        this.socket.bytesRead;
        this.socket.on('data', (data) => {
            parser.decodeReply(data);
        });

        this.HELLO(this.options.protover as string);
    }

    private initOptions(options: IClientOptions): void {
        options.host = options.host || '127.0.0.1';
        options.port = options.port || 6379;
        options.protover = options.protover || '3';
    }

    private addCommand(command: string, attr: JsonCommand[keyof JsonCommand]): void {
        const name = command.replace(/( |-)/g, '');
        let fn;
        if (attr.args === undefined) {
            fn = async () => {
                return this.runCommand(command);
            };
        } else {
            fn = async (...args: string[]) => {
                return this.runCommand(command, args);
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Client as any).prototype[name] = (Client as any).prototype[name.toLowerCase()] = fn; 
    }

    private runCommand(command: string, args?: string[]) {
        args?.forEach(arg => {
            if (typeof arg !== 'string') {
                throw Error('Arguments must be string.');
            }
        });

        return new Promise((resolve, reject) => {
            parser.callbacks.push((err, reply) => {
                err ? reject(err) : resolve(reply);
            });
            const buffer = parser.encodeCommand(command, args);
            this.socket.write(buffer);
        });
    }
}