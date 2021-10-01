const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-channel')
        .setDescription("Update the channel clue & Keywords")
        .addStringOption(option =>
            option.setName('action')
            .setDescription("What would you like to do?")
            .setRequired(true)
            .addChoice('Update Channel Question & Answer', 'reSetup')
            .addChoice('Add Keyword(s)', 'addKeywords')
            .addChoice('Update Roles', 'setRoles')
        )
        .addStringOption(option =>
            option.setName('question')
            .setDescription("The Question or Clue to be posted in chat.")
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('keywords')
            .setDescription('The Answers/Keywords to listen for. Please separate by comma.')
            .setRequired(false)
        )
        .addRoleOption(option =>
            option.setName('role-add')
            .setDescription("Role to give when keyword guessed")
            .setRequired(false)
        )
        .addRoleOption(option =>
            option.setName('role-remove')
            .setDescription("Role to take when keyword guessed")
            .setRequired(false)
        ),
    async execute(interaction, guildProfile) {
        let choice = interaction.options.getString('action')
        let question = interaction.options.getString('question')
        let keywords = interaction.options.getString('keywords')
        let roleAdd = interaction.options.getRole('role-add')
        let roleRemove = interaction.options.getRole('role-remove')
        let channelData = guildProfile.channelData.find(channelData => channelData.channel === interaction.channel.id)

        if (choice === 'reSetup') {
            if (!question && !keywords) {
                return interaction.reply({content: "Please try again and use the `Question` & `Keywords` option with this choice.", ephemeral: true})
    
            } else {
                channelData.clue = question,
                channelData.keywords = keywords.split(',')
                guildProfile.save();
                return interaction.reply({content: "Updated channel's Question & Keywords!", ephemeral: true})
            };
        } else if (choice === 'addKeywords') {
            if (!keywords) {
                return interaction.reply({content: "Please try again and usr the `Keywords` option with this choice.", ephemeral: true});
            
            } else {
                channelData.keywords = keywords.split(',')
                guildProfile.save();
                return interaction.reply({content: "Added those Keywords to the list of accepted words.", ephemeral: true});
            };
        } else if (choice === 'setRoles') {
            if (!roleAdd && !roleRemove) {
                return interaction.reply({content: "Please try again and use either the `role-add` or `role-remove` options with this choice.", ephemeral: true});

            } else if (!roleAdd) {
                channelData.roleRemove = roleRemove.id
                guildProfile.save();
                return interaction.reply({content: "Added role to be removed when correct keyword guessed.", ephemeral: true});
            } else if (!roleRemove) {
                channelData.roleAdd = roleAdd.id
                guildProfile.save();
                return interaction.reply({content: "Added role to be added when correct keyword guessed.", ephemeral: true});
            }
        }
    },
};