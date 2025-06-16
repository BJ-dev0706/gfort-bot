require('dotenv').config();

module.exports = {
    client: {
        intents: [
            'Guilds',
            'GuildMembers',
            'GuildMessages',
            'MessageContent'
        ],
        activity: {
            name: 'welcoming new members! 👋',
            type: 'WATCHING'
        }
    },
    canvas: {
        width: 1024,
        height: 500,
        avatarSize: 300
    },
    channels: {
        welcome: process.env.WELCOME_CHANNEL_ID,
        ticket: process.env.TICKET_CHANNEL_ID,
        ticketCategory: process.env.TICKET_CATEGORY_ID
    },
    guild: process.env.GUILD_ID,
    token: process.env.DISCORD_TOKEN
}; 