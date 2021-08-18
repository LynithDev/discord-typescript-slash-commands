/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { CommandContext } from './CommandContext';

export type CommandOptionChoice = {
    name: string,
    value: string | number
}

// eslint-disable-next-line no-shadow
export enum CommandOptionType {
    BOOLEAN,
    CHANNEL,
    INTEGER,
    MENTIONABLE,
    ROLE,
    STRING,
    USER
}

export type CommandOption = {
    type: CommandOptionType,
    name: string,
    description: string,
    required?: boolean,
    choices?: CommandOptionChoice[]
}

export default abstract class Command {
    // eslint-disable-next-line no-empty-function
    constructor(public name: string, public description: string) { }

    abstract execute(ctx: CommandContext)

    addOptions() {
        const options: CommandOption[] = [];
        return options;
    }

    addSubcommands() {
        return [];
    }

    addSubcommandGroups() {
        return [];
    }
}
