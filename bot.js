const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('i\'m ready');
});

client.on('message', message => {
    if(message.content === 'ping'){
        message.reply('pong'); 
    }
});

client.on('message', message => {
    if(message.content === 'whoru'){
        message.reply('i\'m 수면시간보장\'s bot!'); 
    }
});


client.login(process.env.BOT_TOKEN);
