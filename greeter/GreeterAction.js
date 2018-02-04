const PingAction = require('./PingAction.js');

class GreeterAction{

    constructor(message){
        this._message = message;
    }

    run(){
        throw new Error("must implement method!");
    }

    static createAction(message){
        console.log('on message');
        if(!message.author.bot && message.content === 'ping'){
            console.log('create action ping');
            return new PingAction(message);
        }
    }
};
module.exports = GreeterAction;

class PingAction extends GreeterAction{

    run(){
        this._message.channel.send('pong');
    }
};