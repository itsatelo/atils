const { ErrorBuilder } = require('../ErrorUtil.js');
module.exports = class extends ErrorBuilder {
    constructor(message) {
        super('BuildError', message ?? 'Outdated build', {
            date: true,
            stackTrace: true,
        });
    }
}