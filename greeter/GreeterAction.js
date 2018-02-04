class GreeterAction{

    constructor(message){
        this._message = message;
    }

    run(){
        throw new Error("must implement method!");
    }
}

function createAction(message){
    if(!message.author.bot && message.content === 'ping'){
        return new PingAction(message);
    }
}