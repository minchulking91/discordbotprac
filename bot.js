const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const GreeterAction = require('./greeter/GreeterAction');

var command = require('./command');

client.on('ready', () => {
    console.log('i\'m ready');
    // command.init();
});

client.on('message', function(message) {
    var action = GreeterAction.createAction(message);
    if(action != null){
        action.run();
    }
    // Don't forget to log the message!
    // if(!message.author.bot){
    //     var result = command.checkAndExecute(message);
    //     if(result != null){
    //         message.channel.send(result);
    //     }else{
    //         var echoResult = command.executeIfEcho(message.content);
    //         if(echoResult != null){
    //             message.channel.send(echoResult);
    //         }
    //     }
    //     // message.channel.send('hello!');    
    // }
});


client.login(process.env.BOT_TOKEN);

//for debug
// const settings = require('./settings.json');
// client.login(settings.token);
