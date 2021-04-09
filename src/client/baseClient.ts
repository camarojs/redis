import { Socket } from 'net';
import { ProtoVer } from '../types';
import commands from '../command/commands.json';
import ParserV2 from '../parser/parser.v2';
import ParserV3 from '../parser/parser.v3';

export interface IClientOptions {
    host?: string;
    port?: number;
    db?: number;
    username?: string;
    password?: string;
}

export abstract class BaseClient {
    private socket = new Socket();
    private parser: ParserV2 | ParserV3;
    private reconnectIntervalHandle: number | null = null;
    constructor(public options: IClientOptions, protover: ProtoVer) {
        this.parser = protover === 3 ? new ParserV3() : new ParserV2();
        commands.forEach(command => { this.addCommand(command); });
        this.initOptions(options);
        this.connect();
    }

    abstract init(): void;

    private connect(): void {
        this.socket.connect(
            this.options.port as number,
            this.options.host as string
        );
        this.socket.setKeepAlive(true);

        this.socket.on('connect', () => {
            if (this.reconnectIntervalHandle !== null) {
                clearInterval(this.reconnectIntervalHandle);
                this.reconnectIntervalHandle = null;
            }
            this.init();
        });
        this.socket.on('data', (data) => {
            this.parser.decodeReply(data);
        });

        this.socket.on('error', (err) => {
            console.error('Redis socket error', err);
            this.reconnect();
        });
        this.socket.on('close', () => this.reconnect());
        this.socket.on('end', () => this.reconnect());
    }

    private reconnect(): void {
        if(this.reconnectIntervalHandle !== null)
            return;
        this.reconnectIntervalHandle = setInterval(() => {
            this.socket.connect(
                this.options.port as number,
                this.options.host as string
            );
        }, 10000) as unknown as number;
    }

    private initOptions(options: IClientOptions): void {
        options.host = options.host || '127.0.0.1';
        options.port = options.port || 6379;
        options.db = options.db || 0;
        options.username = options.username || 'default';
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
            this.parser.callbacks.push((err, reply) => {
                err ? reject(err) : resolve(reply);
            });
            const buffer = this.parser.encodeCommand(command, args);
            this.socket.write(buffer);
        });
    }

    public on(event: string, listener: (data: unknown) => void): void {
        switch (event) {
            case 'message':
                this.parser.on(event, listener);
                break;
        }
    }
}