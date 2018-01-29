module.exports = {
    
    onEcho: function (commandArray) {
        if(commandArray.length == 4){//!echo register a b
            if(commandArray[1] === 'register'){
                return onEchoRegister(commandArray[2], commandArray[3]);
            }
        }else if(commandArray.length == 2){
            if(commandArray[1] === 'show'){
                return printAllEcho();
            }
        }
        return 'invalid command!';
    },
    getEchoString:function(content){
        console.log('on get echo string');
        var searchValue = null;
        echoMap.forEach(function search(value, key, map){
            if(content.indexOf(key) > -1){
                return searchValue = value;
            }
        })
        console.log(searchValue);
        return searchValue;
    }
  };

var echoMap = new Map();

function onEchoRegister(key, value){
    echoMap.set(key, value);
    var message = `add echo ${key}, ${value}`
    console.log(message);
    return message;
}

function printAllEcho(){
    return JSON.stringify([...echoMap]);
}