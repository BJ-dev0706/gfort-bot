const { generateWelcomeImage } = require('../utils/imageGenerator');
const { welcomeMessage } = require('../utils/messageTemplates');
const config = require('../config');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        try {
            const channel = member.guild.channels.cache.get(config.channels.welcome);
            if (!channel) return;

            const imageBuf = await generateWelcomeImage(member);
            const embed = welcomeMessage.createEmbed(member);

            await channel.send({
                embeds: [embed],
                files: [{ attachment: imageBuf, name: 'welcome.png' }]
            });
        } catch (err) {
            console.error('Error sending welcome message:', err);
        }
    }
}; 