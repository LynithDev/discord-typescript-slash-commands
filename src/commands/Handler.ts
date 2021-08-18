/* eslint-disable comma-dangle */
/* eslint-disable no-async-promise-executor */
import { Client, CommandInteraction, Interaction } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';
import * as bot from '../../bot';
import config from '../../config.json';
import Command, { CommandOption, CommandOptionType } from './Command';
import { CommandContext } from './CommandContext';

const files = fs.readdirSync(path.join(__dirname, 'impl'));
export const commands: Command[] = [];

export const registerCommands = () => new Promise(async (resolve, reject) => {
    await files.forEach(async (file: string) => {
        if (file.endsWith('js')) {
            const command: Command = (await import(path.join(__dirname, 'impl', file))).default;
            commands.push(command);
        }
    });
    resolve('');
});

export const getCommand = (name: string): Command | null => {
    let cmd: Command | null = null;
    commands.forEach((command: Command) => {
        if (command.name.toLowerCase() == name.toLowerCase()) {
            cmd = command;
        }
    });
    return cmd;
};

export const onSlashCommand = async (client: Client, interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const command: Command = await getCommand(interaction.commandName);

    if (command == (null || undefined)) return;

    const ctx: CommandContext = new CommandContext(interaction);
    command.execute(ctx);
};

export const addOptions = (data: SlashCommandBuilder, option: CommandOption) => {
    if (option.required == (undefined || null)) option.required = false;
    if (option.choices == (undefined || null)) option.choices = [];

    const choices = [];

    switch (option.type) {
        default:
            break;
        case CommandOptionType.BOOLEAN:
            data.addBooleanOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required));
            break;
        case CommandOptionType.CHANNEL:
            data.addChannelOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required));
            break;
        case CommandOptionType.INTEGER:

            option.choices.forEach((opt) => {
                choices.push([opt.name, opt.value]);
            });

            data.addIntegerOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required)
                .addChoices(choices));
            break;
        case CommandOptionType.MENTIONABLE:
            data.addMentionableOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required));
            break;
        case CommandOptionType.ROLE:
            data.addRoleOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required));
            break;
        case CommandOptionType.STRING:

            option.choices.forEach((opt) => {
                choices.push([opt.name, opt.value]);
            });

            data.addStringOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required)
                .addChoices(choices));
            break;
        case CommandOptionType.USER:
            data.addUserOption((opt) => opt.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required));
            break;
    }
};

export const updateCommands = () => new Promise(async (resolve, reject) => {
    const rest = new REST({ version: '9' }).setToken(config.token);
    try {
        await registerCommands();

        console.log(`Started slash commands update in guild ${config.guildId}.`);

        const scData = [];

        commands.forEach((cmd) => {
            const data = new SlashCommandBuilder()
                .setName(cmd.name)
                .setDescription(cmd.description);

            if (cmd.addOptions().length != 0 && cmd.addSubcommands().length != 0) {
                throw new Error(`Command '${cmd.name}' cannot have subcommands and options together!`);
            }

            cmd.addOptions().forEach((option) => {
                console.log('add options');
                console.log(option);

                addOptions(data, option);
            });

            cmd.addSubcommands().forEach((subcommand) => {
                console.log('ad subcomadn');
                console.log(subcommand);
                if (subcommand.options == (undefined || null)) subcommand.options = [];

                data.addSubcommand((opt) => opt.setName(subcommand.name).setDescription(subcommand.description));
                subcommand.options.forEach((option) => {
                    addOptions(data, option);
                });
            });

            scData.push(data.toJSON());
        });

        await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: scData });

        console.log(`Successfully updated slash commands in guild ${config.guildId}.`);
        resolve('');
    } catch (error) {
        console.error(error);
        reject(error);
    }
});
