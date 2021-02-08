import { IBaseCommand } from './baseCommand';

export interface IClientCommand extends IBaseCommand {
    HGETALL(key: string): Promise<string[]>;
}