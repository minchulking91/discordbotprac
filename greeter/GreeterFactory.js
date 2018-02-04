const GreeterAction = require('./GreeterAction');
const EchoAction = require('./EchoAction');
const HelpAction = require('./HelpAction');
const EmojiAction = require('./EmojiAction');

const ActionEnum = {
    ECHO: 1,
    EMOJI: 2,
    HELP: 3,
    properties: {
        1: { name: "echo", value: 1 },
        2: { name: "emoji", value: 2 },
        3: { name: "help", value: 3 }
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
    }
}

function parsingCommand(content) {
    if (content.startsWith('!help')) {
        return ActionEnum.HELP;
    } else if (content.startsWith('!emoji')) {
        return ActionEnum.EMOJI;
    } else if (content.startsWith('!echo')) {
        return ActionEnum.ECHO;
    }
    return ActionEnum.ECHO; //may be echo
}