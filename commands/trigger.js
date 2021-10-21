const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('triggers')
        .setDescription("View, add or remove a trigger.")
        .addStringOption(option =>
            option.setName("action")
            .setDescription("What action would you like to preform?")
            .setRequired(true)
            .addChoice('Add', 'add')
            .addChoice('Remove', "remove")
            .addChoice('View', 'view')
        )
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription("The channel to add, remove or view a trigger")
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('trigger')
            .setDescription("The trigger word(s) for this channel")
            .setRequired(false)
        )
        .addRoleOption(option =>
            option.setName('remove-role')
            .setDescription("Role to remove when triggered.")
            .setRequired(false)
        )
        .addRoleOption(option =>
            option.setName('role-add')
            .setDescription('Role to add when triggered.')
            .setRequired(false)
        ),
    async execute(interaction, guildProfile) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({
                content: "You Lack the necessary permissions to run this command. Needed permissions: \`ADMINISTRATOR\`",
                ephemeral: true
            });
        } else {
            const roleToRemove = interaction.options.getRole('remove-role');
            const roleToAdd = interaction.options.getRole('role-add');
            const channel = interaction.options.getChannel('channel');
            const trigger = interaction.options.getString('trigger');
            const action = interaction.options.getString('action');

            if (action === 'add') {
                guildProfile.triggers.push({
                    channel: channel.id,
                    keyword: trigger,
                    roleRemove: roleToRemove.id,
                    roleAdd: roleToAdd.id
                });
                guildProfile.save();

                return interaction.reply({
                    content: `Added Trigger \`${trigger}\` to channel: ${channel.toString()}`,
                    ephemeral: true
                });
            } else if (action === "remove") {
                let triggerData = guildProfile.triggers.find(trigger => trigger.keyword === trigger);
                guildProfile.triggers.pull(triggerData);
                guildProfile.save();

                return interaction.reply({
                    contents: `Removed trigger \`${triggerData.keyword}\` from <#${triggerData.channel}>`,
                    ephemeral: true
                });

            } else if (action === 'view') {
                if (!channel) {
                    if (guildProfile.triggers.length < 25) {
                        let embed = new MessageEmbed()
                            .setTitle(`Triggers for ${interaction.guild.name}`)
                            .setDescription("All active triggers are listed below")
                        for (trigger of guildProfile.triggers) {
                            embed.addField(
                                "\u200b",
                                `Keyword: ${trigger.keyword} \nChannel: <#${trigger.channel}> \nRoleRemove: <@&${trigger.roleRemove}> \nRoleAdd: <@&${trigger.roleAdd}>`,
                                true
                            )
                        }
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    }
                } else {
                    let triggers = guildProfile.triggers.find(trigger => trigger.channel === channel.id);
                    let embed = new MessageEmbed()
                        .setTitle(`rigger for ${channel.name}`)
                        .setDescription("All active triggers for the mentioned channel.")
                    for (trigger of triggers) {
                        embed.addField(
                            "\u200b",
                            `Keyword: ${trigger.keyword} \nRoleRemove: <@&${trigger.roleRemove}> \nRoleAdd: <@&${trigger.roleAdd}>`,
                            true
                        )
                    }
                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                }
            }
        }
    },
};