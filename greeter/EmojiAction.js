const path = process.cwd();
const GreeterFactory = require(`${path}/greeter/GreeterAction`);

module.exports = class EmojiAction extends GreeterAction {
    static newInstance() {
        console.log('Method implemented successfully!');
    }
}