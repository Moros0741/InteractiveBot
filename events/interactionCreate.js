const guildSchema = require('../models/guildSchema')

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        let guildProfile;

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
        
        try {
            guildProfile = await guildSchema.findOne({guildID: interaction.guild.id})
            if (!guildProfile) {
                let serverprofile = new guildSchema({
                    guildID: interaction.guild.id
                });
                serverprofile.save()
                guildProfile = serverprofile
            }
        } catch(error) {
            console.error(error)
        };
        
        try {
            await command.execute(interaction, guildProfile);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};