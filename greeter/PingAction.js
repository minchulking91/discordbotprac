export default class PingAction extends GreeterAction{
    constructor(message){
        super(mesasge);
    }

    run(){
        this._message.channel.send('pong');
    }
};
