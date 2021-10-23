const { MessageEmbed } = require('discord.js');

exports.send = async function(message, channelID, trigger) {
    let channel = message.guild.channels.cache.find(channel => channel.id === channelID);

    let embed = new MessageEmbed()
        .setTitle("Keyword Triggered!")
        .setDescription(`The keyword \`${trigger.keyword}\` was triggered by: ${message.author.toString()} in ${message.channel.toString()}`)
        .setColor(message.guild.me.displayHexColor)

    await channel.send({
        embeds: [embed]
    });
};