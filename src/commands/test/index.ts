import { Command } from "discord.js"

const command: Command = {
    name: "test",
    description: "hello from test command",
    async execute(message, args) {
        message.reply('hello')
    },
};

export = command;