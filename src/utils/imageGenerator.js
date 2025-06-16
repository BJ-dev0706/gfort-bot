const Jimp = require('jimp');
const config = require('../config');

async function generateWelcomeImage(member) {
    const { width, height, avatarSize } = config.canvas;
    const canvas = new Jimp(width, height, '#23272A');

    try {
        const background = await Jimp.read('assets/bg.png');
        background.resize(width, height);
        canvas.composite(background, 0, 0);
    } catch (err) {
        console.error('Error loading background image:', err);
    }

    const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
    const avatar = await Jimp.read(avatarURL);
    avatar.resize(avatarSize, avatarSize).circle();
    const avatarX = width - avatarSize - 50;
    const avatarY = height - avatarSize - 100;
    canvas.composite(avatar, avatarX, avatarY);

    return canvas.getBufferAsync(Jimp.MIME_PNG);
}

module.exports = {
    generateWelcomeImage
}; 