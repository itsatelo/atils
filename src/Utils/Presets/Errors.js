const { RawErrorManager } = require('../ErrorUtil.js');

/**
 * An Error that is meant to be used when an excessive number of parameters are provided.
 * @class
 * @extends RawErrorManager
 */
class ExcessiveError extends RawErrorManager {
    /**
     * Creates a brand new ExcessiveError with the provided message.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super("ExcessiveError", message);
    }
}

/* Errors for Atils */

class MergeUtilityError extends RawErrorManager {
    constructor(message) {
        super("MergeUtility", message);
    }
}

class CollectionError extends RawErrorManager {
    constructor(message) {
        super("Collection", message);
    }
}

class ErrorUtilityError extends RawErrorManager {
    constructor(message) {
        super("ErrorUtility", message);
    }
}

module.exports = {
    ExcessiveError,

    MergeUtilityError,
    CollectionError,
    ErrorUtilityError,
};