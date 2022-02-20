const { ErrorBuilder } = require('../ErrorUtil.js');

module.exports = class extends ErrorBuilder {
    constructor(message) {
        console.log(message);
        super(`ConsoleError`, message, {
            date: true,
            stackTrace: true,
        });
    }
}