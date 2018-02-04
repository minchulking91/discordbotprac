const path = process.cwd();
const GreeterFactory = require(`${path}/greeter/GreeterAction`);

module.exports = class EchoAction extends GreeterAction {
    constructor(message) {
        this._message = message;
    }
    
    static newInstance(message) {
        if (typeof message === Message) {
            if (message.author.bot) {
                return null;
            }
            if(message.content === 'ping'){
                return new PingAction(message);
            }
        }
        return null;
    }
    run() {
        _message.channel.send('pong');
    }
}