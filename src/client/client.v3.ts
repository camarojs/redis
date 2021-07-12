import { IClientCommand } from '../command/command.v2';
import { BaseClient, IClientOptions } from './baseClient';

export interface Client extends IClientCommand {
    options: IClientOptions
}

export class Client extends BaseClient {
    constructor(options: IClientOptions = {}) {
        super(options, 3);
    }

    async init(): Promise<void> {
        if (this.options.password) {
            await this.HELLO(3, 'auth', this.options.username as string, this.options.password);
        } else {
            await this.HELLO(3);
        }
        await this.SELECT(this.options.db as number);
    }
}