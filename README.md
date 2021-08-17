# discord-typescript-slash-commands
A Discord.JS TypeScript Slash Command Handler.

## Making a Discord Bot and Slash Commands Application
1. Visit https://discord.com/developers/applications
2. Create a new application
3. On the left side of the page, there is a button named `Bot`. Click that and press `Create a new bot`
4. Configure it to your liking and make sure to enable all the intents
5. On the left side of the page, there is a button named `OAuth`. Click that and scroll down to `scopes`
6. Make sure to check the boxes: `bot` and `applications.commands`
7. Then copy the OAuth URL (below the checkboxes) and paste it into your browser
8. Invite / Add the applications to your desired server 

## Setting up the project
1. `git clone` the repository
2. Open the folder in your desired editor (I personally use Visual Studio Code)
3. Make a new file called `config.json`. Inside you should have the following:
```json
{
    "token": "discord-bot-token",
    "clientId": "discord-client-id",
    "guildId": "discord-guild-id",
    "color_success": "#48db5b",
    "color_error": "#db4f48",
    "color_normal": "#3878f7",
    "update_commands": false
}
```
4. Open the terminal and write `npm i`. After that, write `npm run watch` to start live compiling your TypeScript code
5. Open another terminal and write `npm run start` to run your bot

## Making a command
To make a command, create a new file inside `/src/commands/impl/` and name it whatever you want. Inside, you make a class and extend `Command` like shown below
```ts
import Command from '../Command';
import { CommandContext } from '../CommandContext';

class ExampleCommand extends Command {
    constructor() {
        super('echo', 'Repeats what you say');
    }

    // eslint-disable-next-line class-methods-use-this
    execute(ctx: CommandContext) {
        // code
    }
}

export default new ExampleCommand();
```
After that, you can open config and set `update_commands` to true to send a request to update the slash commands.

### Note
This was my first TypeScript project and also my first time using Discord.JS which explains why the code may be a little goofy :)
