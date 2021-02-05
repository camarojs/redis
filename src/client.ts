import { Socket } from 'net';
import { IClientCommand } from './clientCommand';
import commands from './commands.json';
import parserv2 from './parser.v2';
import parserv3 from './parser.v3';

let parser: typeof parserv2 | typeof parserv3 = parserv3;

export interface IClientOptions {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    protover?: 2 | 3;
}

export interface Client extends IClientCommand {
    options: IClientOptions
}

export class Client implements Client {
    private socket = new Socket();
    constructor(
        public options: IClientOptions = {}
    ) {
        commands.forEach(command => { this.addCommand(command); });
        this.initOptions(options);
        this.connect();
    }

    private connect(): void {
        this.socket.connect(
            this.options.port as number,
            this.options.host as string
        );
        this.socket.setKeepAlive(true);

        if (this.options.protover === 3) {
            parser = parserv3;
            if (this.options.password) {
                this.HELLO(3, 'auth', this.options.username as string, this.options.password);
            } else {
                this.HELLO(3);
            }
        }

        if (this.options.protover === 2) {
            parser = parserv2;
            if (this.options.password) {
                this.AUTH(this.options.password);
            }
        }

        this.socket.on('data', (data) => {
            parser.decodeReply(data);
        });
    }

    private initOptions(options: IClientOptions): void {
        options.host = options.host || '127.0.0.1';
        options.port = options.port || 6379;
        options.username = options.username || 'default';
        options.protover = options.protover || 3;
    }

    private addCommand(command: string): void {
        const fn = async (...args: string[]) => {
            return this.runCommand(command, args);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)[command] = (this as any)[command.toUpperCase()] = fn;
    }

    private runCommand(command: string, args?: string[]) {
        args = args?.map(arg => '' + arg);

        // TODO: MONITOR commands
        return new Promise((resolve, reject) => {
            parser.callbacks.push((err, reply) => {
                err ? reject(err) : resolve(reply);
            });
            const buffer = parser.encodeCommand(command, args);
            this.socket.write(buffer);
        });
    }

    public on(event: string, listener: (data: unknown) => void): void {
        switch (event) {
            case 'message':
                parser.on(event, listener);
                break;
        }
    }
}