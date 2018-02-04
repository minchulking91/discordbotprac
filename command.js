const commandRegex = /^!.*/;
const echo = require('./echo');
const emoji = require('./emoji');

module.exports = {
    init:function(){
        echo.setup();
    },
    checkAndExecute:function(message){
        var content = '';
        content = message.content;
        if(content.startsWith('!')){
            var result = parsingCommand(content);
            message.channel.send(result);
        }else{
            var echoResult = executeIfEcho(message.content);
            if(echoResult != null){
                message.channel.send(echoresult);
            }
        }
    }
    
}

function executeIfEcho(content){
    return echo.readIfExist(content);
}

function parsingCommand(content){
    if(content.startsWith('!help')){
        var embedMessage = {embed: {
            color: 3447003,
            author: {
              name: 'greeter-bot',
            },
            title: "!help",
            fields: [],
            timestamp: new Date(),
          }
        }
        console.log('catch help');
        var helpFields = echo.getHelp();
        helpFields.forEach(function(element){
            embedMessage['embed']['fields'].push(element);
        })
        return embedMessage;
    }else if(echo.check(content)){
        console.log('catch echo');
        return echo.execute(content);
    }else if(emoji.check(content)){
        console.log('catch emoji');
        return emoji.execute(content);
    }
}

