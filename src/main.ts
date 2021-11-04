import * as fs from 'fs';
import "dotenv/config"
import Discord, { Command } from "discord.js";

const TOKEN = process.env.TOKEN as string
const PREFIX = process.env.PREFIX as string

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.commands = new Discord.Collection();


// Dynamically reading command files from ./commands directory
const commandFolders = fs.readdirSync("./dist/commands");

// Register all commands to the client
for (const folder of commandFolders) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${folder}/index.js`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('I was ready')
})

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/\r?\n/)[0].split(/ +/);
    const commandName = (args.shift() as string).toLowerCase();

    if (!client.commands.has(commandName)) return;

    try {
        const command = client.commands.get(commandName) as Command;

        if (command.enabled === false) return;

        if (
            (command.allowedGuilds || command.allowedUsers) &&
            message.guild &&
            !command.allowedGuilds?.includes(message.guild.id) &&
            !command.allowedUsers?.includes(message.author.id)
        ) {
            await message.reply("No permission to run this command");
            return;
        }

        // Executing command dynamically by command name
        await command.execute(message, args);

    } catch (error) {
        await message.reply(`Failed to execute the command`);
    }
});

(async () => {
    client.login(TOKEN);
})();