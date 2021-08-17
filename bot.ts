import { Client, Intents, Interaction } from 'discord.js';
import * as Handler from 'src/commands/Handler';
import config from './config.json';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => { console.log(`Logged in as ${client.user?.tag}`); });

client.on('interactionCreate', (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    Handler.onSlashCommand(client, interaction);
});

if (config.update_commands) Handler.updateCommands();

client.login(config.token);
