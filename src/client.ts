import { Socket } from 'net';

export interface IClientOptions {
    host?: string;
    port?: number;
    auth?: string;
}

interface IClient {
    connect(): void;
}

export class Client implements IClient {
    private socket = new Socket();
    constructor(
        private readonly options: IClientOptions = {}
    ) {
        this.initOptions(options);
    }

    public connect(): void {
        this.socket.connect(
            this.options.port as number,
            this.options.host as string
        );
    }

    private initOptions(options: IClientOptions): void {
        options.host = options.host || '127.0.0.1';
        options.port = options.port || 6379;
    }
}