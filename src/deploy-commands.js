/*
This script adds the slash commands in the 'COMMANDS' folder
to your server. This must be ran before running your index.js 
file. Otherwise the commands will not register in your server.

-------------- DO NOT EDIT BELOW THIS LINE -----------------*/

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./data/config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async() => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();