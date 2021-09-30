const { MessageEmbed, Interaction } = require('discord.js');
const guildSchema = require('../models/guildSchema')
const userSchema = require('../models/userSchema')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        let guildProfile = await guildSchema.findOne({"guildID": message.guild.id});
        let channelData = guildProfile.channelData.find(channelData => channelData.channel === message.channel.id)
        
        if (!channelData || message.author.bot) return;

        if (!channelData.keywords.includes(message.content)) {
            try {
                await message.delete();
            } catch (err) {
                console.error(err)
            }
        } else {
            try {
                let member = message.guild.members.cache.find(member => member.id === message.author.id)

                await member.roles.add(channelData.roleAdd)
                await member.roles.remove(channelData.roleRemove)
                return message.delete();
            } catch (err) {
                console.error(err)
            }
        }
    },
};