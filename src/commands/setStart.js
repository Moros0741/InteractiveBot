const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-start')
        .setDescription('Set Start Role and custom Log channel')
        .addStringOption(option =>
            option.setName('action')
            .setDescription("Action / System to setup")
            .setRequired(true)
            .addChoice('Start Role', 'start-role')
            .addChoice('Set Log', 'set-log')
            .addChoice("Both", 'both')
        )
        .addRoleOption(option =>
            option.setName('start-role')
            .setDescription("Role to give users when they '!start'.")
            .setRequired(false)
        )
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription("Channel to log uses of '!start'.")
            .setRequired(false)
        ),
    async execute(interaction, guildProfile) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({
                content: "This command requires \`ADMINSITRATOR\` permissions. Which you don't have.",
                ephemeral: true
            });
        } else {
            let action = interaction.options.getString('action');
            let role = interaction.options.getRole('start-role');
            let channel = interaction.options.getChannel('channel');

            if (action === 'start-role') {
                guildProfile.startSystem.role = role.id
                guildProfile.save();

                return interaction.reply({
                    content: `Start role has been set to: ${role.toString()}. Any member that uses \`!start\` will be granted this role.`,
                    ephemeral: true
                });
            } else if (action === 'set-log') {
                guildProfile.startSytstem.channel = channel.id
                guildProfile.save();
                return interaction.reply({
                    content: `Start command usage will now be logged in ${channel.toString}.`,
                    ephemeral: true
                });
            } else if (action === 'both') {
                guildProfile.startSystem.role = role.id
                guildProfile.startSystem.channel = channel.id
                guildProfile.save();
                return interaction.reply({
                    content: `Starter System Set up, Successfully! All users that use the \`!start\` will be given ${role.toString()} & uses will be logged in ${channel.toString()}`,
                    ephemeral: true
                });
            }
        }
    }
}