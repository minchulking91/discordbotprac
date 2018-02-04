const GreeterAction = require('./GreeterAction');

module.exports = class HelpAction extends GreeterAction {
    static newInstance() {
        console.log('Method implemented successfully!');
    }
}