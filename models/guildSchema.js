/*
Allows the databse on MongoDB to recognize how to store and 
access data. This is critical for ALL code to run in this bot. 

-------------- DO NOT CHANGE BELOW THIS LINE -------------------
*/

const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    guildID: String,
    triggerIds: [],
    botManagers: [{ userID: String, permissions: [] }],
    logging: {
        isActive: { type: Boolean, defualt: false },
        channel: String,
    },
    triggers: [{
        triggerID: Number,
        channel: String,
        keyword: String,
        removeRoles: { type: Array, default: undefined },
        addRoles: { type: Array, default: undefined }
    }]
});

let model = new mongoose.model('guilds', guildSchema);

module.exports = model;