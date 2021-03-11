import { IClientCommand } from '../command/command.v2';
import { BaseClient, IClientOptions } from './baseClient';

export interface Client extends IClientCommand {
    options: IClientOptions
}

export class Client extends BaseClient {
    constructor(options: IClientOptions = {}) {
        super(options, 2);
    }

    init(): void {
        if (this.options.password) {
            this.AUTH(this.options.password);
        }
        this.SELECT(this.options.db as number);
    }
}
