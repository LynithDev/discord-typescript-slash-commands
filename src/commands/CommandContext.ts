import { CommandInteraction, MessageEmbed } from 'discord.js';
import { capitalizeString } from '../utils/StringUtils';
import config from '../../config.json';

export class CommandContext {
    private event: CommandInteraction;

    private config = config;

    constructor(event: CommandInteraction) {
        this.event = event;
    }

    get getEvent() { return this.event; }

    get getChannel() { return this.event.channel; }

    get getUser() { return this.event.user; }

    get getGuild() { return this.event.guild; }

    get getMember() { return this.event.member; }

    get getConfig() { return this.config; }

    get successEmbed() {
        return new MessageEmbed()
            .setColor('GREEN')
            .setTitle(capitalizeString(`${this.event.commandName} - Success!`))
            .setAuthor(this.event.user.tag, this.event.user.avatarURL());
    }
}
