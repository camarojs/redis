import { IBaseCommand } from './baseCommand';

export interface IClientCommand extends IBaseCommand {
    HGETALL(key: string): Promise<Map<string, string>>;
}