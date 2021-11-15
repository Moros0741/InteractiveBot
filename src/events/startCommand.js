const guildSchema = require('../models/guildSchema');
const logs = require('../modules/logging');

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (!message.guild) return;

        let guildProfile = await guildSchema.findOne({ guildID: message.guild.id });

        if (!message.content.startsWith('!start') || message.author.bot) {
            return
        }

        if (!guildProfile) {
            try {
                let newProfile = new guildSchema({
                    guildID: message.guild.id
                });
                newProfile.save();
                return message.reply("Please run the slash commands provided to set up this bot.");
            } catch (err) {
                console.error(err);
            }
        }

        let startSystem = guildProfile.startSystem;
        let channelTriggers = []
        for (trigger of guildProfile.triggers) {
            if (trigger.channel === message.channel.id) {
                channelTriggers.push(trigger);
            }
        }

        if (channelTriggers.length > 0) return;

        if (!startSystem.role) {
            return message.reply({
                content: "Please use the set-start slash command to set up this system."
            });
        }

        let member = message.guild.members.cache.find(member => member.id === message.author.id);

        await member.roles.add(startSystem.role)

        if (startSystem.role != undefined) {
            if (guildProfile.logging.isActive && guildProfile.logging.channel != undefined) {
                let logChannel = guildProfile.logging.channel
                await logs.sendStart(message, logChannel);
            }
        }
        return message.delete();
    }
};