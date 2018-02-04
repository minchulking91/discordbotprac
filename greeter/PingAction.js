const GreeterAction = require('./GreeterAction.js');

class PingAction extends GreeterAction{

    run(){
        this._message.channel.send('pong');
    }
};
module.exports = PingAction;