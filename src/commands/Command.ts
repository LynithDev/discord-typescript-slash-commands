/* eslint-disable no-useless-constructor */
import { CommandContext } from './CommandContext';

export default abstract class Command {
    // eslint-disable-next-line no-empty-function
    constructor(public name: string, public description: string) { }

    abstract execute(ctx: CommandContext)

    static addOptions() {
        return [];
    }

    static addSubcommands() {
        return [];
    }
}
