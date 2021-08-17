import Command from '../Command';
import { CommandContext } from '../CommandContext';

class TestCommand extends Command {
    constructor() {
        super('sayok', 'Says Ok');
    }

    // eslint-disable-next-line class-methods-use-this
    execute(ctx: CommandContext) {
        ctx.getEvent.reply({
            content: 'Ok',
            ephemeral: true,
        });
    }
}

export default new TestCommand();
