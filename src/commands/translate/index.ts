import { Command } from "discord.js"
import translate from '@vitalets/google-translate-api'

const command: Command = {
    name: "translate",
    description: "translate lang",
    async execute(message, args) {
        const [lang, ...words]: Array<string> = args
        const word = words.join(' ')
        translate(word, { to: lang }).then(res => {
            const embedMessage = {
                "fields": [
                    {
                        "name": `From ${res.from.language.iso}`,
                        "value": word,
                        "inline": false
                    },
                    {
                        "name": `To ${lang}`,
                        "value": res.text,
                        "inline": false
                    }
                ]
            }
            console.log(res)
            message.channel.send({ embeds: [embedMessage] });
        }).catch(err => {
            console.error(err);
        });
    },
};

export = command;