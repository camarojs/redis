import { IClientCommand } from '../command/command.v2';
import { BaseClient, IClientOptions } from './baseClient';

export interface Client extends IClientCommand {
    options: IClientOptions
}

export class Client extends BaseClient {
    constructor(options: IClientOptions = {}) {
        super(options, 2);
    }

    async init(): Promise<void> {
        if (this.options.password) {
            await this.AUTH(this.options.password);
        }
        await this.SELECT(this.options.db as number);
    }
}
