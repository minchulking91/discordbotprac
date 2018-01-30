const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
var echo = require('./echo');

var commandRegex = /^!.*/;

function onCommand(command){
    var commandArray = command.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
    if(commandArray[0] === '!echo'){
        return echo.onEcho(commandArray);
    }else if(commandArray[0]==='!닥쳐' || commandArray[0] ==='!shutup'){
        return echo.setEnableEcho(false);
    }else if(commandArray[0] === '!그리터?'){
        return echo.setEnableEcho(true);
    }else{
        return 'invalid command!';
    }
}
client.on('ready', () => {
    console.log('i\'m ready');
});

client.on('message', message => {
    if(message.content === 'ping'){
        message.reply('pong'); 
    }
});

client.on('message', function(message) {
    // Don't forget to log the message!
    if(!message.author.bot){
        if(commandRegex.test(message.content)){
            var result = onCommand(message.content);
            message.channel.send(result);
        }else{
            var echoString = echo.getEchoString(message.content);
            if(echoString != null){
                message.channel.send(echoString);
            }
        }
        // message.channel.send('hello!');    
    }
});


// client.login(process.env.BOT_TOKEN);

//for debug
const settings = require('./settings.json');
client.login(settings.token);
