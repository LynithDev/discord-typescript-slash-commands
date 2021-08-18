/* eslint-disable class-methods-use-this */
import Command, { CommandOption, CommandOptionType, SubCommandOption } from '../Command';
import { CommandContext } from '../CommandContext';

class TestCommand extends Command {
    constructor() {
        super('sayok', 'Says Ok');
    }

    execute(ctx: CommandContext) {
        console.log(ctx.getEvent.options);

        ctx.getEvent.reply({
            content: 'Ok',
            ephemeral: true,
        });
    }

    addOptions() {
        const options: CommandOption[] = [
            {
                type: CommandOptionType.STRING,
                name: 'stringoption',
                description: 'This is a string option. It is required',
                required: true,
            },
            {
                type: CommandOptionType.STRING,
                name: 'stringoptiontwo',
                description: 'This is another string option. It is not required and has choices',
                choices: [
                    {
                        name: 'choice one',
                        value: 'Here is the value',
                    },
                    {
                        name: 'choice two',
                        value: 'Here is another value',
                    },
                ],
            },
        ];
        return options;
    }

    addSubcommands() {
        const options: SubCommandOption[] = [
            {
                name: 'test',
                description: 'ok',
                options: [
                    {
                        type: CommandOptionType.STRING,
                        name: 'stringoptiona',
                        description: 'This is a string option. It is required',
                    },
                ],
            },
        ];
        return options;
    }
}

export default new TestCommand();
