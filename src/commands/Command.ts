import { CommandContext } from "./CommandContext";
import { SlashCommandBuilder } from '@discordjs/builders';

export default abstract class Command {
    constructor(public name: string, public description: string) { }

    abstract execute(ctx: CommandContext)

    addOptions() {
        return [];
    }

}