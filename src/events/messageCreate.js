/*
The messageCreate event listens to any messages sent that are 
initiated from the  Discord Client Application and checks for 
the trigger word(s) of the channel the message is sent in. If no 
trigger is set, it returns to waiting quietly. 

-------------- DO NOT EDIT BELOW THIS LINE -------------------*/

const { MessageEmbed, Interaction, MessageManager } = require('discord.js');
const guildSchema = require('../models/guildSchema')
const logs = require('../modules/logging');

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        let guildProfile = await guildSchema.findOne({ "guildID": message.guild.id });
        let channelTriggers;
        try {
            let triggers = [];
            for (trigg of guildProfile.triggers) {
                if (trigg.channel === message.channel.id) {
                    triggers.push(trigg);
                }
            }
            channelTriggers = triggers;
        } catch (err) {
            console.error(err);
        }
        if (channelTriggers.length === 0 || message.author.bot) {
            return
        } else {

            for (channelTrigg of channelTriggers) {
                if (channelTrigg.keyword.toLowerCase() === message.content.toLowerCase()) {
                    try {
                        let member = message.guild.members.cache.find(member => member.id === message.author.id)

                        if (channelTrigg.removeRoles) {
                            await member.roles.remove(channelTrigg.removeRoles);
                        };

                        if (channelTrigg.addRoles) {
                            await member.roles.add(channelTrigg.addRoles);
                        };
                        if (guildProfile.logging.isActive === true) {
                            await logs.send(message, guildProfile.logging.channel, channelTrigg);
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
            return message.delete();
        }
    },
};