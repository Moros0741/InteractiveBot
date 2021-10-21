/*
Allows the databse on MongoDB to recognize how to store and 
access data. This is critical for ALL code to run in this bot. 

-------------- DO NOT CHANGE BELOW THIS LINE -------------------
*/

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