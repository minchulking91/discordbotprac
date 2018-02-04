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
}

