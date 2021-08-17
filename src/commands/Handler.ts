import { Client, CommandInteraction, Interaction } from "discord.js";
import fs from "fs";
import path from "path";
import * as bot from "../../bot";
import config from "../../config.json";
import Command from "./Command";
import { CommandContext } from "./CommandContext";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { SlashCommandBuilder } from "@discordjs/builders";

const files = fs.readdirSync(path.join(__dirname, "impl"));
export const commands: Command[] = [];

export const registerCommands = () => {
    return new Promise(async (resolve, reject) => {
        await files.forEach(async (file: string) => {
            if(file.endsWith("js")) {
                const command: Command = (await import(path.join(__dirname, "impl", file))).default;
                commands.push(command);
            }
        })
        resolve("");
    })
}

export const getCommand = (name: string): Command | null => {
    let cmd: Command | null = null;
    commands.forEach((command: Command) => {
        if(command.name.toLowerCase() == name.toLowerCase()) {
            cmd = command;
        }
    })
    return cmd;
}

export const onSlashCommand = async (client: Client, interaction: Interaction) => {
    if(!interaction.isCommand()) {
        return;
    }

    const command: Command = await getCommand(interaction.commandName);

    if(command == (null || undefined)) return;

    const ctx: CommandContext = new CommandContext(interaction);
    command.execute(ctx);
}

export const updateCommands = () => {
    return new Promise(async (resolve, reject) => {
        const rest = new REST({ version: '9' }).setToken(config.token);
        try {
            await registerCommands();

            console.log(`Started slash commands update in guild ${config.guildId}.`);

            const scData = [];

            commands.forEach((cmd) => {
                const data = new SlashCommandBuilder()
                    .setName(cmd.name)
                    .setDescription(cmd.description)

                scData.push(data.toJSON());
            })

            await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: scData });

            console.log(`Successfully updated slash commands in guild ${config.guildId}.`);
            resolve("")
        } catch (error) {
            console.error(error);
            reject(error)
        }
    })
}