const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-trigger')
        .setDescription("Add / Remove roles to a trigger for a channel by Trigger ID")
        .addStringOption(option =>
            option.setName('action')
            .setDescription("Action to take. Add / Remove")
            .addChoice('Add', "add")
            .addChoice('Remove', 'remove')
            .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('trigger-id')
            .setDescription("The ID of the Trigger to update.")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('area')
            .setDescription("Area to update")
            .setRequired(true)
            .addChoice('roleAdd', 'roleAdd')
            .addChoice('roleRemove', 'roleRemove')
        )
        .addRoleOption(option =>
            option.setName('role')
            .setDescription("Role to add or remove.")
            .setRequired(true)
        ),
    async execute(interaction, guildProfile) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({
                content: "This command requires \`ADMINISTRATOR\` permissions. Which you don't have.",
                ephemeral: true
            });
        } else {
            let action = interaction.options.getString('action');
            let triggerID = interaction.options.getNumber('trigger-id');
            let area = interaction.options.getString('area');
            let role = interaction.options.getRole('role');

            let trigger = guildProfile.triggers.find(trigger => trigger.triggerID === triggerID);

            if (action === 'add') {
                if (area === 'roleRemove') {
                    trigger.removeRoles.push(role.id);
                    guildProfile.save();
                    return interaction.reply({
                        content: `Added ${role.toString()} to removeRole section of trigger \`${trigger.triggerID}\``,
                        ephemeral: true
                    });
                } else if (area === 'addRoles') {
                    trigger.addRoles.push(role.id);
                    guildProfile.save();
                    return interaction.reply({
                        content: `Added ${role.toString()} to addRole section of trigger \`${trigger.triggerID}\``,
                        ephemeral: true
                    });
                }
            } else if (action === 'remove') {
                if (area === 'roleRemove') {
                    trigger.removeRoles.pull(role.id);
                    guildProfile.save();
                    return interaction.reply({
                        content: `Removed ${role.toString()} from removeRole section of trigger \`${trigger.triggerID}\``,
                        ephemeral: true
                    });
                } else if (area === 'roleAdd') {
                    trigger.addRoles.pull(role.id);
                    guildProfile.save();
                    return interaction.reply({
                        content: `Removed ${role.toString()} from addRoles section of trigger \`${trigger.triggerID}\``,
                        ephemeral: true
                    });
                }
            }
        }
    },
};