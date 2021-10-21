const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    guildID: String,
    botManagers: [{ userID: String, permissions: [] }],
    logChannel: String,
    triggers: [{
        channel: String,
        keyword: String,
        roleRemove: String,
        roleAdd: String
    }]
});

let model = new mongoose.model('guilds', guildSchema);

module.exports = model;