import { Collection } from "discord.js";

type CommandArgs = {
    name: string;
    description?: string;
};

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>;
    }

    export interface Command {
        name: string;
        description: string;
        args?: CommandArgs[];
        enabled?: boolean;
        allowedUsers?: string[];
        allowedGuilds?: string[];
        execute: (message: Message, args: string[]) => Promise<unknown>;
        buttonInteractionIdPrefix?: string;
        buttonInteraction?: (interaction: ButtonInteraction) => Promise<unknown>;
    }
}