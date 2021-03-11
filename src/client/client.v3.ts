import { IClientCommand } from '../command/command.v2';
import { BaseClient, IClientOptions } from './baseClient';

export interface Client extends IClientCommand {
    options: IClientOptions
}

export class Client extends BaseClient {
    constructor(options: IClientOptions = {}) {
        super(options, 3);
    }

    init(): void {
        if (this.options.password) {
            this.HELLO(3, 'auth', this.options.username as string, this.options.password);
        } else {
            this.HELLO(3);
        }

        this.SELECT(this.options.db as number);
    }
}