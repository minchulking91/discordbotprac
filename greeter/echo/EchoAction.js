const databaseHelper = require('./databasehelper');
const GreeterAction = require('./GreeterAction');

const echoRegRegex = /^!echo (register|reg) (\S+) (.+)\n?$/g;
const echoUnregRegex = /^!echo (unregister|unreg) (\S+)\n?$/g;
const echoOffRegex = /^!echo (shutup|닥쳐|off)\n?$/g;
const echoOnRegex = /^!echo (hello|그리터?|on)\n?$/g;
const echoHelpRegex = /^!echo help\n?$/g;
const echoShowRegex = /^!echo show\n?$/g;

const echoRegex = /^!echo (register|reg|unregister|unreg|shutup|닥쳐|off|hello|그리터?|on|help|show) .*\n?$/g;

var echoMap = new Map();
var echoEnable = true;

module.exports = class EchoAction extends GreeterAction {
    constructor(message) {
        this._message = message;
    }

    static init() {
        if (isSetup) {
            return;
        }
        isSetup = true;
        databaseHelper.selectEchos(function (newEchoMap) {
            echoMap = newEchoMap;
            console.log(`load echo map ${echoMap}`);
        });
    }

    static newInstance(message) {
        if (typeof message === Message) {
            if (message.author.bot) {
                return null;
            }
            var command = getCommand(message.content);
            if (command != null) {
                return newRegAction(message);
            }
        }
        return null;
    }
    run() {
        var resultMessage = '';
        switch (this._command) {
            case 'register':
                resultMesage = executeRegister();
                break;
            case 'unregister':
                resultMesage = executeUnregister();
                break;
            case 'on':
                resultMesage = executeOn();
                break;
            case 'off':
                resultMesage = executeOff();
                break;
            case 'help':
                resultMesage = executeHelp();
                break;
            case 'show':
                resultMesage = executeShow();
        }
        if (resultMessage != null && resultMessage != '') {
            _message.channel.send(resultMessage);
        }
    }
}

function executeEcho(){

}

function executeHelp() {

}
function executeOff() {
    echoEnable = false;
    return '오케이 바이 ㅠㅠ';
}
function executeOn() {
    echoEnable = true;
    return '하잇!';

}

function executeShow() {
    return JSON.stringify([...echoMap]);
}

function executeUnregister() {
    //validate
    var key = _params[0];
    var value = _params[1];
    if (key == null || value == null) {
        return;
    }
    echoMap.delete(key);
    databaseHelper.deleteEcho(key);

    var message = `now greeter-bot forgot **__${key}__**`
}

function executeRegister() {
    //validate
    var key = _params[0];
    var value = _params[1];
    if (key == null || value == null) {
        return;
    }
    echoMap.set(key, value);
    databaseHelper.addEcho(key, value);

    var resultMessage = `now greeter-bot read **__${key}__** and say **__${value}__**`
    console.log(resultMessage);

    return resultMessage;
}

function getCommand(content) {
    var result = echoRegex.test(content);
    if (result != null) {
        return result[1];
    }
}

function newRegAction(message) {
    var content = message.content;
    var result = echoRegRegex.exec(content);
    if (result != null) {
        var key = result[2];
        var value = result[3];
        var echoAction = new EchoAction(message);
        echoAction._command = 'register';
        echoAction._params = new Array(value);
        return echoAction;
    }
}

function newUnregAction(message) {
    var content = message.content;
    var result = echoUnregRegex.exec(content);
    if (result != null) {
        var key = result[2];
        var value = result[3];
        var echoAction = new EchoAction(message);
        echoAction._command = 'unregister';
        echoAction._params = new Array(value);
        return echoAction;
    }
}

function newOnAction(message) {
    var content = message.content;
    var result = echoOnRegex.test(content);
    if (result) {
        var echoAction = new EchoAction(message);
        echoAction._command = 'on';
        return echoAction;
    }
}

function newOffAction(message) {
    var content = message.content;
    var result = echoOffRegex.test(content);
    if (result) {
        var echoAction = new EchoAction(message);
        echoAction._command = 'off';
        return echoAction;
    }
}
function newHelpAction(message) {
    var content = message.content;
    var result = echoHelpRegex.test(content);
    if (result) {
        var echoAction = new EchoAction(message);
        echoAction._command = 'help';
        return echoAction;
    }
}