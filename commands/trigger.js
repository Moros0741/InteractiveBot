/*
The triggers.js command below allows for easy updating of the 
database. You can add, remove, or view triggers for a channel
or the entire server.

-------------- DO NOT EDIT BELOW THIS LINE ----------------*/

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
            let roleToRemove = interaction.options.getRole('remove-role');
            let roleToAdd = interaction.options.getRole('role-add');
            let channel = interaction.options.getChannel('channel');
            let trigger = interaction.options.getString('trigger');
            let action = interaction.options.getString('action');

            if (action === 'add') {
                guildProfile.triggers.push({
                    channel: channel.id,
                    keyword: trigger.toLowerCase(),
                    roleRemove: roleToRemove.id,
                    roleAdd: roleToAdd.id
                });
                try {
                    guildProfile.save();
                } catch (err) {
                    console.error(err)
                }
                return interaction.reply({
                    content: `Added Trigger \`${trigger.toLowerCase()}\` to channel: ${channel.toString()}`,
                    ephemeral: true
                });
            } else if (action === "remove") {
                let triggerData = guildProfile.triggers.find(triggerData => triggerData.keyword === trigger.toLowerCase());
                guildProfile.triggers.pull(triggerData);
                guildProfile.save();

                return interaction.reply({
                    content: `Removed trigger \`${trigger}\`.`,
                    ephemeral: true
                });

            } else if (action === 'view') {
                if (!channel) {
                    if (guildProfile.triggers.length === 0) {
                        let embed = new MessageEmbed()
                            .setTitle(`Triggers for ${interaction.guild.name}`)
                            .setDescription("There are no triggers set up.")
                            .addField(
                                "Add A Trigger",
                                "\`/triggers [action: Add] [channel: #channel] [trigger: triggerWord(s)] [RoleRemove: @role] [RoleAdd: @role]\`",
                                false
                            )
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    } else if (guildProfile.triggers.length < 25) {
                        let embed = new MessageEmbed()
                            .setTitle(`Triggers for ${interaction.guild.name}`)
                            .setDescription("All active triggers are listed below")
                        for (trigger of guildProfile.triggers) {
                            embed.addField(
                                "\u200b",
                                `**Keyword:** \`${trigger.keyword}\` \n**Channel:** <#${trigger.channel}> \n**RoleRemove:** <@&${trigger.roleRemove}> \n**RoleAdd:** <@&${trigger.roleAdd}>`,
                                true
                            )
                        }
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    }
                } else {
                    let embed = new MessageEmbed()
                        .setTitle(`Triggers for ${channel.name}`)
                        .setDescription("All active triggers for the mentioned channel.")
                    for (trigg of guildProfile.triggers) {
                        if (trigg.channel === channel.id) {
                            embed.addField(
                                "\u200b",
                                `**Keyword:** \`${trigg.keyword}\` \n**RoleRemove:** <@&${trigg.roleRemove}> \n**RoleAdd:** <@&${trigg.roleAdd}>`,
                                true
                            )
                        }
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