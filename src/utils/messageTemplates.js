const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const welcomeMessage = {
    createEmbed: (member) => {
        return new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`Welcome to ${member.guild.name}! 🎉`)
            .setDescription(
                `Hey ${member}, welcome to our community!\n\n` +
                '• Feel free to introduce yourself\n' +
                '• Check out our rules and channels\n' +
                '• Have fun and enjoy your stay!'
            )
            .setImage('attachment://welcome.png')
            .setFooter({ text: `Member #${member.guild.memberCount}` })
            .setTimestamp();
    }
};

const ticketMessage = {
    createPanel: () => {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🎫 Support Tickets')
            .setDescription('Need help? Click the button below to create a support ticket and our staff will assist you as soon as possible.')
            .addFields(
                { name: '📝 How to create a ticket', value: '1. Click the "Create Ticket" button below\n2. Fill out the form with your issue\n3. Wait for a staff member to assist you' },
                { name: '⚠️ Important', value: 'Please provide as much detail as possible about your issue to help us assist you better.' }
            )
            .setFooter({ text: 'Our staff will assist you as soon as possible' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎫')
            );

        return { embed, row };
    },

    createTicketEmbed: (user, reason) => {
        return new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Ticket Created')
            .setDescription(`Ticket created by ${user}`)
            .addFields(
                { name: 'Issue', value: reason }
            )
            .setTimestamp();
    },

    createTicketButtons: () => {
        return new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('Close Ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒')
            );
    }
};

module.exports = {
    welcomeMessage,
    ticketMessage
}; 