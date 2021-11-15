/*
The triggers command below allows for easy updating of the 
database. You can add, remove, or view triggers for a channel
or the entire server.

-------------- DO NOT EDIT BELOW THIS LINE ----------------*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const helper = require('../modules/helper');

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
            .addChoice('Clear', 'clear')
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
                let triggerID = helper.getTriggerId(guildProfile);
                guildProfile.triggerIds.push(triggerID)
                if (roleToAdd === null) {
                    let removeRoles = new Array(roleToRemove.id);
                    guildProfile.triggers.push({
                        triggerID: triggerID,
                        channel: channel.id,
                        keyword: trigger.toLowerCase(),
                        removeRoles: removeRoles,
                    });
                    try {
                        guildProfile.save();
                    } catch (err) {
                        console.error(err);
                    }
                } else if (roleToRemove === null) {
                    let addRoles = new Array(roleToAdd.id);
                    guildProfile.triggers.push({
                        triggerID: triggerID,
                        channel: channel.id,
                        keyword: trigger.toLowerCase(),
                        addRoles: addRoles,
                    });
                    try {
                        guildProfile.save();
                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    let removeRoles = Array(roleToRemove.id) || undefined;
                    let addRoles = Array(roleToAdd.id) || undefined;
                    guildProfile.triggers.push({
                        triggerID: triggerID,
                        channel: channel.id,
                        keyword: trigger.toLowerCase(),
                        removeRoles: removeRoles,
                        addRoles: addRoles
                    });
                    try {
                        guildProfile.save();
                    } catch (err) {
                        console.error(err)
                    }
                }
                return interaction.reply({
                    content: `Added Trigger \`${trigger.toLowerCase()}\` to channel: ${channel.toString()} with id: \`${triggerID}\``,
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
                    } else if (guildProfile.triggers.length < 9) {
                        let embed = new MessageEmbed()
                            .setTitle(`Triggers for ${interaction.guild.name}`)
                            .setDescription("All active triggers are listed below")
                        for (trigger of guildProfile.triggers) {
                            let removeRolesArray;
                            let addRolesArray
                            if (trigger.removeRoles === undefined) {
                                removeRolesArray = "none"
                            } else {
                                let rolesArr = new Array(trigger.removeRoles.map(role => `<@&${role}>`));
                                removeRolesArray = rolesArr.join(', ');
                            }
                            if (trigger.addRoles === undefined) {
                                addRolesArray = "None"
                            } else {
                                let rolesArr = new Array(trigger.addRoles.map(role => `<@&${role}>`));
                                addRolesArray = rolesArr.join(', ');
                            }
                            embed.addField(
                                `ID #\`${trigger.triggerID}\``,
                                `**Keyword:** \`${trigger.keyword}\` \n**Channel:** <#${trigger.channel}> \n**RoleRemove:** ${removeRolesArray} \n**RoleAdd:** ${addRolesArray}`,
                                true
                            )
                        }
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    } else if (guildProfile.triggers.length > 9) {
                        await helper.displayAllTriggers(interaction, guildProfile.triggers);
                    }
                } else {
                    let embed = new MessageEmbed()
                        .setTitle(`Triggers for ${channel.name}`)
                        .setDescription("All active triggers for the mentioned channel.")
                    for (trigg of guildProfile.triggers) {
                        if (trigg.channel === channel.id) {
                            let removeRolesArray;
                            if (trigg.removeRoles === undefined) {
                                removeRolesArray = "None";
                            } else {
                                let rolesArr = Array(trigg.removeRoles.map(role => `<@&${role}>`));
                                removeRolesArray = rolesArr.join(', ');
                            }
                            let addRolesArray;
                            if (trigg.addRoles === undefined) {
                                addRolesArray = "None";
                            } else {
                                let rolesArr = Array(trigg.addRoles.map(role => `<@&${role}>`));
                                addRolesArray = rolesArr.join(', ');
                            }
                            embed.addField(
                                `ID #\`${trigg.triggerID}\``,
                                `**Keyword:** \`${trigg.keyword}\` \n**RoleRemove:** ${removeRolesArray} \n**RoleAdd:** ${addRolesArray}`,
                                true
                            )
                        }
                    }
                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                }
            } else if (action === 'clear') {
                await helper.clearAllTriggers(interaction, guildProfile);
            }
        }
    },
};