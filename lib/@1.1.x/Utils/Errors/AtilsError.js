const { ErrorBuilder } = require('../ErrorUtil.js');

module.exports = class extends ErrorBuilder {
    constructor(message) {
        super("AtilsError", message ?? `Unable to perform action.`, {
            date: true,
            stackTrace: true,
        });
    }
}