const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const command = require('./command');
const databaseHelper = require('./databasehelper');
const EchoAction = require('./greeter/EchoAction');
const GreeterFactory = require('.greeter/GreeterFactory');

client.on('ready', () => {
    console.log('i\'m ready');
    databaseHelper.makeConnection();
    EchoAction.init();

    command.init();
});

client.on('message', message => {
    
    if(!message.author.bot){
        var result = command.checkAndExecute(message);
    }
});

client.login(process.env.BOT_TOKEN);

//for debug
// const settings = require('./settings.json');
// client.login(settings.token);
