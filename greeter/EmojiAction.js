const GreeterAction = require('./GreeterAction');

module.exports = class EmojiAction extends GreeterAction {
    static newInstance() {
        console.log('Method implemented successfully!');
    }
}