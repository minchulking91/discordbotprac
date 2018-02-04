const path = process.cwd();
const GreeterAction = require(`${path}/greeter/GreeterAction`);

module.exports = class EmojiAction extends GreeterAction {
    static newInstance() {
        console.log('Method implemented successfully!');
    }
}