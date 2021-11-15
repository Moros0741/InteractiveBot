const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlogs')
        .setDescription('Set / Enable logging & log channel')
        .addStringOption(option =>
            option.setName('action')
            .setDescription("The Action to take")
            .setRequired(true)
            .addChoice('Enable', 'enable')
            .addChoice('Set Channel', "setChannel")
        )
        .addBooleanOption(option =>
            option.setName('enable')
            .setDescription("Activate/Deactivate Logging system. True = On, False = Off")
            .setRequired(false)
        )
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('Channel to log triggers to.')
            .setRequired(false)
        ),
    async execute(interaction, guildProfile) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({
                content: "This command requires \`ADMINISTRATOR\` permissions. Which you don't have.",
                ephemeral: true
            });
        } else {
            let action = interaction.options.getString('action');
            let enabled = interaction.options.getBoolean('enable');
            let channel = interaction.options.getChannel('channel');
            let state;
            if (action === 'enable') {
                if (enabled === true) {
                    state = "Activated";
                } else if (enabled === false) {
                    state = "Deactivated"
                } else {
                    state = "MALFUNCTIONED"
                };

                guildProfile.logging.isActive = enabled
                guildProfile.save();
                return interaction.reply({
                    content: `Logging System \`${state}\``,
                    ephemeral: true
                });
            } else if (action === 'setChannel') {
                guildProfile.logging.channel = channel.id
                guildProfile.save();
                return interaction.reply({
                    content: `Trigger logs will now be sent to ${channel.toString()}`,
                    ephemeral: true
                });
            }
        }
    },
};