const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config');
const { loadCommands, handleCommand } = require('./handlers/commandHandler');
const { loadEvents } = require('./handlers/eventHandler');

const client = new Client({
    intents: config.client.intents.map(intent => GatewayIntentBits[intent])
});

loadCommands(client);
loadEvents(client);

client.on('error', console.error);

client.on('interactionCreate', handleCommand);

client.login(config.token);
