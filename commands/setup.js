const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Permissions, Channel } = require('discord.js')
const guildSchema = require('../models/guildSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel-setup')
        .setDescription("Set Channel and Keyword")
        .addStringOption(option =>
            option.setName('clue')
            .setDescription("Give a clue for members to guess the keyword.")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('keyword')
            .setDescription('Keyword to listen for')
            .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role-remove')
            .setDescription('Role to Remove when keyword guessed.')
            .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role-add')
            .setDescription('Role to add to move to next level')
            .setRequired(true)
        ),
    async execute(interaction, guildProfile) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({content: "You must be an administrator to use this command.", ephemeral: true});

        } else {
            let clue= interaction.options.getString('clue');
            let channel = interaction.channel;
            let roleAdd = interaction.options.getRole('role-add');
            let roleRemove = interaction.options.getRole('role-remove');
            let keywords = [];
            let keyword = interaction.options.getString('keyword');

            if (!clue && !keyword) {
                return interaction.reply({content: "Please try again and use the `Clue`, `Keyword`, `Role-Remove`, __AND__ `Role-Add` Options. \n\n**Examples:** \n> `/channel-setup [Clue: Your Clue] [Keyword: Your-keyword] [Role-Remove: role mention] [Role-Add: role mention]`", ephemeral: true})

            } else {
                keywords.push(keyword);

                let channelData = guildProfile.channelData.find(channelData => channelData.channel === channel.id) 
                if (!channelData) {
                    guildProfile.channelData.push({
                        "channel": channel.id,
                        "clue": clue,
                        "keywords": keywords,
                        "roleRemove": roleRemove.id,
                        "roleAdd": roleAdd.id
                    });
                    guildProfile.save();
                } else {
                    return interaction.reply({content: "This Channel is already setup.", ephemeral: true});
                };

                let embed = new MessageEmbed()
                    .setTitle('Clue:')
                    .setDescription(clue)
                    .setColor(interaction.guild.me.displayHexColor)
                
                await channel.send({embeds: [embed]});
                return interaction.reply({content: "Channel has been setup successfully! Use `/update-channel` insead.", ephemeral: true});

            };
        };
    },
};