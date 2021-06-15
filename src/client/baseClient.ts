import { Socket } from 'net';
import commands from '../command/commands.json';
import ParserV2 from '../parser/parser.v2';
import ParserV3 from '../parser/parser.v3';

export interface IClientOptions {
    host?: string;
    port?: number;
    db?: number;
    username?: string;
    password?: string;
    reconnection?: boolean;
}

export type ProtoVer = 2 | 3;

declare module 'net' {
    interface Socket {
        pending: boolean
    }
}

export abstract class BaseClient {
    private socket = new Socket();
    private parser: ParserV2 | ParserV3;
    /** Store the command that executed before connect */
    private queue: string[] = [];
    options: IClientOptions;
    constructor(options: IClientOptions, protover: ProtoVer) {
        this.parser = protover === 3 ? new ParserV3() : new ParserV2();
        commands.forEach(command => { this.addCommand(command); });
        this.options = this.initOptions(options);
        this.connect();
    }

    abstract init(): void;

    async connect(): Promise<void> {
        this.socket.connect(this.options.port as number, this.options.host as string);
        this.socket.setKeepAlive(true);
        this.socket.on('connect', () => {
            this.queue.forEach(elem => {
                this.socket.write(elem);
            });
            this.handleConnect?.();
        });
        this.socket.on('data', (data) => {
            this.parser.decodeReply(data);
        });
        this.socket.on('error', err => { this.handleError(err); });
        this.socket.on('close', (hadError) => {
            /**
             * In addition to actively disconnecting the client or server, 
             * it will automatically reconnect 
             */
            if (hadError && this.options.reconnection) {
                this.reconnect();
            }
        });

        this.init();
    }

    private reconnect(): void {
        setTimeout(() => {
            this.socket.connect(this.options.port as number, this.options.host as string);
        }, 100);
    }

    private handleConnect?: () => void;
    private handleError(err: Error): void {
        console.error(err + '');
    }

    private initOptions(options: IClientOptions): IClientOptions {
        const cloneOptions: IClientOptions = {};
        cloneOptions.host = options.host || '127.0.0.1';
        cloneOptions.port = options.port || 6379;
        cloneOptions.db = options.db || 0;
        cloneOptions.username = options.username || 'default';
        cloneOptions.reconnection = options.reconnection !== false;
        return cloneOptions;
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
            if (this.socket.pending) {
                this.queue.push(buffer);
            } else {
                this.socket.write(buffer);
            }
        });
    }

    public on(event: 'message' | 'error' | 'connect', listener: (data?: unknown) => void): void {
        switch (event) {
            case 'message':
                this.parser.on(event, listener);
                break;
            case 'error':
                this.handleError = listener;
                break;
            case 'connect':
                this.handleConnect = listener;
        }
    }
}