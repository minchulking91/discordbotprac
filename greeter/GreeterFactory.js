const path = process.cwd();
const GreeterAction = require('./GreeterAction');
const EchoAction = require('./echo/EchoAction');
const HelpAction = require('./HelpAction');
const EmojiAction = require('./EmojiAction');
const PingAction = require('./dev/PingAction');

const ActionEnum = {
    ECHO: 1,
    EMOJI: 2,
    HELP: 3,
    PING: 4,
    properties: {
        1: { name: "echo", value: 1 },
        2: { name: "emoji", value: 2 },
        3: { name: "help", value: 3 },
        4: { name: "ping", value: 4 }
    }
};

module.exports = function createAction(message) {
    const action = parsingCommand(message.content);
    switch (action) {
        case ActionEnum.ECHO:
            return EchoAction.newInstance(message);
            break;
        case ActionEnum.EMOJI:
            return EmojiAction.newInstance(message);
            break;
        case ActionEnum.HELP:
            return HelpAction.newInstance(message);
            break;
        case ActionEnum.PING:
            return PingAction.newInstance(message);
            break;
    }
}

function parsingCommand(content) {
    if (content.startsWith('!help')) {
        return ActionEnum.HELP;
    } else if (content.startsWith('!emoji')) {
        return ActionEnum.EMOJI;
    } else if (content.startsWith('!echo')) {
        return ActionEnum.ECHO;
    } else if (content === 'ping') {
        return ActionEnum.PING;
    }
    return ActionEnum.ECHO; //may be echo
}