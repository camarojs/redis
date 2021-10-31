import net, { NetConnectOpts, Socket } from 'net';
import tls, { SecureContextOptions, TLSSocket } from 'tls';
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
    tls?: SecureContextOptions;
    logger?: (err: Error, reply: unknown, command: string, args?: string[]) => void
}

export type ProtoVer = 2 | 3;

declare module 'net' {
    interface Socket {
        pending: boolean
    }
}

export abstract class BaseClient {
    private socket!: Socket | TLSSocket;
    private parser: ParserV2 | ParserV3;
    /** Store the command that executed before connect */
    private queue: string[] = [];
    options: IClientOptions;
    private connectionOpts: NetConnectOpts;
    private attempts = 0;
    constructor(options: IClientOptions, protover: ProtoVer) {
        this.parser = protover === 3 ? new ParserV3() : new ParserV2();
        commands.forEach(command => { this.addCommand(command); });
        this.options = this.initOptions(options);
        this.connectionOpts = {
            port: this.options.port as number,
            host: this.options.host
        };
        Object.assign(this.connectionOpts, this.options.tls);

        // Ignore HostName Mismatch
        if (this.options.host === '127.0.0.1') {
            Object.assign(this.connectionOpts, { rejectUnauthorized: false });
        }

        this.connect();
    }

    private connect() {
        this.socket = this.options.tls
            ? tls.connect(this.connectionOpts)
            : net.createConnection(this.connectionOpts);
        this.socket.setKeepAlive(true);

        const connectEventName = this.options.tls ? 'secureConnect' : 'connect';
        this.socket.on(connectEventName, async () => {
            this.attempts = 0;
            this.queue.forEach(elem => {
                this.socket.write(elem);
            });
        });

        this.socket.on('data', (data) => {
            this.parser.decodeReply(data);
        });

        this.socket.on('error', err => {
            if (this.handleError) {
                this.handleError(err);
            } else {
                console.error(err);
            }
        });

        this.socket.on('close', (hadError) => {
            /**
             * In addition to actively disconnecting the client or server, 
             * it will automatically reconnect 
             */
            if (hadError && this.options.reconnection) {
                this.reconnect();
            }
        });

        this.init().then(() => {
            this.handleConnect?.();
        }).catch(error => {
            if (this.handleError) {
                this.handleError(error);
            } else {
                throw error;
            }
        });
    }

    abstract init(): Promise<void>;

    private reconnect(): void {
        this.attempts++;
        setTimeout(() => {
            this.socket.destroy();
            this.socket.unref();
            this.connect();
        }, Math.min(this.attempts * this.attempts * 100, 15000));
    }

    private handleConnect?: () => void;
    private handleError?: (err: Error) => void;

    private initOptions(options: IClientOptions): IClientOptions {
        const cloneOptions: IClientOptions = {};
        cloneOptions.host = options.host || '127.0.0.1';
        cloneOptions.port = options.port || 6379;
        cloneOptions.db = options.db || 0;
        cloneOptions.username = options.username || 'default';
        cloneOptions.reconnection = options.reconnection !== false;
        cloneOptions.password = options.password;
        cloneOptions.logger = options.logger;
        if (options.tls) {
            cloneOptions.tls = {};
            Object.assign(cloneOptions.tls, options.tls);
        }
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
                this.options.logger?.(err as Error, reply, command, args);
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