const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userID: String,
    roles: {type: Array, default: undefined},
    duration: Number,
    rolesTaken: Date
});

let model = new mongoose.model('Users', userSchema);

module.exports = model;