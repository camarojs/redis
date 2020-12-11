import { Socket } from 'net';
import { ClientCommand } from './clientCommand';
import commands from './commands.json';

export interface IClientOptions {
    host?: string;
    port?: number;
    auth?: string;
}

export interface Client extends ClientCommand {
    connect(): void;
}

interface JsonCommand {
    command: string;
    args: string | null;
    summary: string;
}

export class Client implements Client {
    private socket = new Socket();
    constructor(
        private readonly options: IClientOptions = {}
    ) {
        commands.forEach((command: JsonCommand) => { this.addCommand(command); });
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

    private addCommand(command: JsonCommand): void {
        const name = command.command.replace(/( |-)/g, '');
        let fn;
        if (command.args === null) {
            fn = async () => {
                return this.runCommand(command.command);
            };
        } else {
            fn = async <T extends (string | number)[]>(...args: [...T]) => {
                return this.runCommand(command.command, args);
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Client as any).prototype[name] = fn;
    }

    private runCommand<T extends (string | number)[]>(command: string, args?: [...T]) {
        console.log(command, args);
    }
}