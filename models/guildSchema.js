const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    guildID: String, 
    botManagers: [{userID: String, permissions: []}],
    channelData: [{channel: String, clue: String, keywords: [], roleRemove: String, roleAdd: String}]
});

let model = new mongoose.model('guilds', guildSchema);

module.exports = model;