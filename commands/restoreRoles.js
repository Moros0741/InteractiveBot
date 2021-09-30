const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const userSchema = require('../models/userSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restore')
        .setDescription("Restore a members roles.")
        .addUserOption(option =>
            option.setName('member')
            .setDescription("Mention a member to restore their roles")
            .setRequired(true)
        ),
    async execute(interaction, guildProfile) {
        let user = interaction.options.getUser('member')
        let userProfile = await userSchema.findOne({"userID": user.id})
        let member;
        try {
            if (!user) {
                return interaction.reply({content: "Please try again and use the `User` option.", ephemeral: true});
            } else {
                member = interaction.guild.members.cache.find(member => member.id === user.id)
            }
        } catch (err) {
            console.error(err);
        }
        try {
            await member.roles.add(userProfile.roles)
        } catch (err) {
            console.error(err)
        }
        let embed = new MessageEmbed()
            .setDescription(`${member.toString()}'s roles have been restored successfully!`)
            .setColor('GREEN')
        return interaction.reply({embeds: [embed], ephemeral: true})
    },
};