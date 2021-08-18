/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { CommandContext } from './CommandContext';

export type CommandOptionChoice = {
    name: string,
    value: string | number
}

export enum CommandOptionType {
    BOOLEAN,
    CHANNEL,
    INTEGER,
    MENTIONABLE,
    ROLE,
    STRING,
    USER,
}

export type CommandOption = {
    type: CommandOptionType,
    name: string,
    description: string,
    required?: boolean,
    choices?: CommandOptionChoice[]
}

export type SubCommandOption = {
    name: string,
    description: string,
    options?: CommandOption[]
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
        const options: SubCommandOption[] = [];
        return options;
    }

    addSubcommandGroups() {

    }
}
