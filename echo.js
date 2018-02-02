// var fileHelper = require('./filehelper');
var databaseHelper = require('./databasehelper');

var startCommands = ['!echo'];
var help = [
    {
        name: "echo register",
        value: "!echo register(alias reg) **__token__** **__string__** : greeter-bot read **__token__** and say **__string__**"
    },
    {
        name: "echo unregister",
        value: "!echo unregister(alias unreg) **__token__** : greeter-bot forget **__token__**"
    },
    {
        name: "echo off",
        value: "!echo shutup(alias 닥쳐) : make silence greeter-bot\'s echo."
    },
    {
        name: "echo on",
        value: "!echo hello(alias 그리터?) : greeter-bot start echo."
    },
    {
        name: "echo show",
        value: "!echo show : show greeter-bot\'s dictionary"
    }
];
module.exports = {
    setup: function () {
        if (isSetup) {
            return;
        }
        isSetup = true;
        databaseHelper.selectEchos(function(newEchoMap){
            echoMap = newEchoMap;
        });
    },
    getHelp: function () {
        return help;
    },
    check: function (content) {
        var startCommand = startCommands.find(function (element) {
            return content.startsWith(element);
        })
        return startCommand != null
    },
    execute: function (content) {
        if (checkIsRegister(content)) {
            return register(content);
        } else if (checkIsUnRegister(content)) {
            return unregister(content);
        } else if (checkIsOn(content)) {
            return setEnableEcho(true);
        } else if (checkIsOff(content)) {
            return setEnableEcho(false);
        } else if (checkIsShow(content)) {
            return printAllEcho();
        }
    },
    readIfExist: function (content) {
        console.log(`echo is ${echoEnable}`);
        if (echoEnable) {
            console.log('on get echo string');
            var searchValue = null;
            echoMap.forEach(function search(value, key, map) {
                if (content.indexOf(key) > -1) {
                    return searchValue = value;
                }
            })
            console.log(searchValue);
            return searchValue;
        }
    },
    onEcho: function (commandArray) {
        if (commandArray.length == 4) {//!echo register a b
            if (commandArray[1] === 'register') {
                return onEchoRegister(commandArray[2], commandArray[3]);
            }
        } else if (commandArray.length == 2) {
            if (commandArray[1] === 'show') {
                return printAllEcho();
            }
        }
        return 'invalid command!';
    },
};
var isSetup = false;
var echoEnable = true;
var echoMap = new Map();

function onEchoRegister(key, value) {
    echoMap.set(key, value);
    var message = `now greeter-bot read **__${key}__** and say **__${value}__**`
    console.log(message);
    updateDirectory(key, value);
    return message;
}
function updateDirectory(key, value){
    databaseHelper.addEcho(key, value);
}
function onEchoUnregister(key) {
    echoMap.delete(key);
    var message = `now greeter-bot forgot **__${key}__**`
    console.log(message);
    // updateDirectory();
    return message;
}

function printAllEcho() {
    return JSON.stringify([...echoMap]);
}

function checkIsRegister(content) {
    return content.startsWith('!echo register ') || content.startsWith('!echo reg ');
}

function checkIsUnRegister(content) {
    return content.startsWith('!echo unregister ') || content.startsWith('!echo unreg ');
}

function checkIsOff(content) {
    return content.startsWith('!echo shutup') || content.startsWith('!echo 닥쳐');
}

function checkIsOn(content) {
    return content.startsWith('!echo hello') || content.startsWith('!echo 그리터?');
}
function checkIsShow(content) {
    return content.startsWith('!echo show');
}
function register(content) {
    console.log('catch register');
    var regex = /^!echo (register|reg) (\S+) (.+)\n?$/g;
    var result = regex.exec(content);
    if (result != null) {
        var key = result[2];
        var value = result[3];
        return onEchoRegister(key, value);
    }
}

function unregister(content) {
    console.log('catch register');
    var regex = /^!echo (unregister|unreg) (\S+)\n?$/g;
    var result = regex.exec(content);
    if (result != null) {
        var key = result[2];
        return onEchoUnregister(key);
    }
}

function setEnableEcho(enabled) {
    echoEnable = enabled;
    if (enabled) {
        return '하잇!';
    }
    return '오케이 바이 ㅠㅠ';
}