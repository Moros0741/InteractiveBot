const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const guildSchema = require('../models/guildSchema');

exports.displayAllTriggers = async function(interaction, triggers) {
    let totalPages = Math.floor(triggers.length / 9);
    let pages = [];
    let cTriggers = chunk(triggers, 9)

    if (triggers.length > 9 && totalPages <= 1) {
        totalPages = 2
    }

    function chunk(arr, chunkSize) {
        if (chunkSize <= 0) throw "Invalid chunk size";
        var R = [];
        for (var i = 0, len = arr.length; i < len; i += chunkSize)
            R.push(arr.slice(i, i + chunkSize));
        return R;
    };
    let index = 0
    let n = 1
    while (index < totalPages) {
        let embed = new MessageEmbed()
            .setTitle(`Triggers for ${interaction.guild.name}`)
            .setColor(interaction.guild.me.displyHexColor)
            .setFooter(`Page ${n} of ${totalPages}`)
        pages.push(embed);
        index++
        n++
    };
    let v = 0
    for (pag of pages) {
        for (cTrigg of cTriggers[v]) {
            pag.addField(`\` Keyword: ${cTrigg.keyword}\``, `**Channel:** <#${cTrigg.channel}> \n**RoleRemove:** <@&${cTrigg.roleRemove}> \n**RoleAdd:** <@&${cTrigg.roleAdd}>`, true)
        }
        v++
    }
    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle('SECONDARY')
            .setLabel("<<")
            .setCustomId('back'),
            new MessageButton()
            .setStyle('DANGER')
            .setLabel("Close")
            .setCustomId('close'),
            new MessageButton()
            .setStyle('SECONDARY')
            .setLabel('>>')
            .setCustomId('forward')
        )
    await interaction.reply("All Triggers for this server are displayed below.")
    let m = await interaction.channel.send({
        embeds: [pages[0]],
        components: [row],
        fetchReply: true
    });
    let curPage = 1

    const collector = m.createMessageComponentCollector({ componentType: 'BUTTON', time: 900000 });

    collector.on('collect', i => {
        if (i.user.id === interaction.user.id) {
            if (i.customId === 'forward') {
                if (curPage < pages.length) {
                    m.edit({ embeds: [pages[curPage]] })
                    curPage++
                    i.deferUpdate();
                } else if (curPage >= pages.length + 1) {
                    i.deferUpdate();
                }
            } else if (i.customId === 'back') {
                if (curPage > 1) {
                    m.edit({ embeds: [pages[curPage - 2]] })
                    curPage--
                    i.deferUpdate();
                } else if (curPage <= 1) {
                    i.deferUpdate();
                }
            } else if (i.customId === 'close') {
                return m.delete()
            }
        } else {
            i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
        }
    });

    collector.on('end', collected => {
        return
    });
};

exports.clearAllTriggers = async function(interaction, guildProfile) {
    let embed = new MessageEmbed()
        .setTitle("Warning!")
        .setDescription("What you are about to do is irreversible.")
        .setColor("RED")
        .addField('Are you Sure?', "Please confirm below that you want to delete **ALL** triggers for this server.", false)

    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("DANGER")
            .setLabel('Yes, Delete')
            .setCustomId('delete'),
            new MessageButton()
            .setStyle('SECONDARY')
            .setLabel("No, Don't Delete")
            .setCustomId('dont-delete')
        )

    let m = await interaction.reply({
        embeds: [embed],
        components: [row],
        fetchReply: true
    });

    const collector = m.createMessageComponentCollector({ componentType: 'BUTTON', time: 900000 });

    collector.on('collect', i => {
        if (i.user.id === interaction.user.id) {
            if (i.customId === 'delete') {
                guildProfile.triggers = []
                guildProfile.save();
                return interaction.followUp({
                    content: "Successfully removed all triggers from the server."
                }).then(() => {
                    return m.delete()
                });
            } else if (i.customId === 'dont-delete') {
                return interaction.followUp({
                    content: "Canceled, Triggers were not deleted."
                }).then(() => {
                    return m.delete()
                });
            };
        } else {
            i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
        }
    });

    collector.on('end', collected => {
        return
    });

}