const GreeterAction = require('./GreeterAction.js');

class PingAction extends GreeterAction{
    constructor(message){
        super(mesasge);
    }

    run(){
        this._message.channel.send('pong');
    }
};
module.exports = PingAction;