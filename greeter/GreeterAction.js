

module.exports = class GreeterAction {
    constructor(message) {
      this._message = message;
    }
    set name(name) {
      this._name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    get name() {
      return this._name;
    }
    sayHello() {
      console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
    }
    excute(){
      var content = '';
        content = _message.content;
        if(content.startsWith('!')){
            var result = parsingCommand(content);
            _message.channel.send(result);
        }else{
            var echoResult = executeIfEcho(message.content);
            if(echoResult != null){
                _message.channel.send(echoresult);
            }
        }
    }
  }