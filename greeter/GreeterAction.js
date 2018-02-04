

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
    run(){
      throw new Error('You have to implement the method doSomething!');
    }
    static newInstance(message){
        throw new Error('You have to implement the method doSomething!');
    }
  }