const { Events, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ticketMessage } = require('../utils/messageTemplates');
const config = require('../config');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Handle button interactions
        if (interaction.isButton()) {
            if (interaction.customId === 'create_ticket') {
                // Check if category exists before showing modal
                const category = interaction.guild.channels.cache.get(config.channels.ticketCategory);
                if (!category) {
                    console.error('Ticket category not found. Category ID:', config.channels.ticketCategory);
                    return interaction.reply({ 
                        content: 'The ticket system is currently unavailable. Please try again later or contact an administrator.', 
                        ephemeral: true
                    });
                }

                const modal = new ModalBuilder()
                    .setCustomId('ticket_modal')
                    .setTitle('Create Support Ticket');

                const reasonInput = new TextInputBuilder()
                    .setCustomId('ticket_reason')
                    .setLabel('What do you need help with?')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true)
                    .setMinLength(10)
                    .setMaxLength(1000)
                    .setPlaceholder('Please describe your issue in detail...');

                const firstActionRow = new ActionRowBuilder().addComponents(reasonInput);
                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            }

            if (interaction.customId === 'close_ticket') {
                const channel = interaction.channel;
                
                // Check if the user is the ticket creator or has ManageChannels permission
                const isTicketCreator = channel.name === `ticket-${interaction.user.username}`;
                const hasManagePermission = interaction.member.permissions.has(PermissionFlagsBits.ManageChannels);

                if (!isTicketCreator && !hasManagePermission) {
                    return interaction.reply({ 
                        content: 'Only the ticket creator or users with Manage Channels permission can close tickets!', 
                        ephemeral: true
                    });
                }

                await interaction.reply('This ticket will be closed in 5 seconds...');
                
                // Wait 5 seconds before closing
                setTimeout(async () => {
                    try {
                        await channel.delete();
                    } catch (error) {
                        console.error('Error closing ticket:', error);
                    }
                }, 5000);
            }
        }

        // Handle modal submissions
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'ticket_modal') {
                const reason = interaction.fields.getTextInputValue('ticket_reason');
                const category = interaction.guild.channels.cache.get(config.channels.ticketCategory);

                if (!category) {
                    console.error('Ticket category not found. Category ID:', config.channels.ticketCategory);
                    return interaction.reply({ 
                        content: 'The ticket system is currently unavailable. Please try again later or contact an administrator.', 
                        ephemeral: true
                    });
                }

                try {
                    // Create the ticket channel
                    const ticketChannel = await interaction.guild.channels.create({
                        name: `ticket-${interaction.user.username}`,
                        type: ChannelType.GuildText,
                        parent: category,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                            },
                        ],
                    });

                    const embed = ticketMessage.createTicketEmbed(interaction.user, reason);
                    const row = ticketMessage.createTicketButtons();

                    await ticketChannel.send({ embeds: [embed], components: [row] });
                    await interaction.reply({ 
                        content: `Your ticket has been created! Please check ${ticketChannel}`, 
                        ephemeral: true
                    });
                } catch (error) {
                    console.error('Error creating ticket channel:', error);
                    await interaction.reply({ 
                        content: 'There was an error creating your ticket. Please try again later or contact an administrator.', 
                        ephemeral: true
                    });
                }
            }
        }
    },
}; 