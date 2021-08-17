import Command from "../Command";
import { CommandContext } from "../CommandContext";
import { SlashCommandBuilder } from "@discordjs/builders";

class TestCommand extends Command {

    constructor() {
        super("echo", "Repeats what you say")
    }

    execute(ctx: CommandContext) {
        console.log("execute")
        ctx.getEvent.reply({
            content: "Ok",
            ephemeral: true
        });
    }
    
}

export default new TestCommand();