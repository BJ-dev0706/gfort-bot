const { ticketMessage } = require('../utils/messageTemplates');
const config = require('../config');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity(config.client.activity.name, { type: config.client.activity.type });

        // Create ticket panel
        try {
            const guild = client.guilds.cache.get(config.guild);
            if (!guild) return;

            const channel = guild.channels.cache.get(config.channels.ticket);
            if (!channel) return;

            // Check if a ticket panel already exists
            const messages = await channel.messages.fetch({ limit: 10 });
            const existingPanel = messages.find(msg => 
                msg.author.id === client.user.id && 
                msg.embeds.length > 0 && 
                msg.embeds[0].title === '🎫 Support Tickets'
            );

            if (existingPanel) {
                console.log('Ticket panel already exists');
                return;
            }

            const { embed, row } = ticketMessage.createPanel();
            await channel.send({ embeds: [embed], components: [row] });
            console.log('Ticket panel created successfully');
        } catch (error) {
            console.error('Error creating ticket panel:', error);
        }
    }
}; 