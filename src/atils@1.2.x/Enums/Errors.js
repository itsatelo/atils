const ErrorBuilder = require('../Utilities/Error.js');
const Enum = require('../Utilities/Enum.js');

// This is just an example of being able to create a custom error system with enums + it uses parameters.
const ErrorEnum = new Enum({
    console: {
        BuildError: {
            Name: "Console Build Error",
            Message: "Unable to build message; reason: <REASON>",
        },

        CounterError: {
            Name: "Console Counter Error",
            Message: "Unable to modify Counter; reason: <REASON>",
        },

        GroupError: {
            Name: "Console Grouping Error",
            Message: "Unable to modify Group; reason: <REASON>",
        },

        TimerError: {
            Name: "Console Timer Error",
            Message: "Could not modify this Timer; reason: <REASON>",
        },
    },

    merge: {

    },

    soft: {
        MissingError: {
            Name: "SOFT Missing Error",
            Message: "Could not complete this SOFT action; reason: <REASON>",
        },

        ExistsError: {
            Name: "SOFT Exists Error",
            Message: "Could not complete this SOFT action; reason: <REASON>",
        },
    },

    structure: {
        BuildError: {
            Name: "Structure Build Error",
            Message: "Could not build this Structure; reason: <REASON>",
        },
    }
});

/**
 * @class
 * @description - A simple custom resolver for the ErrorEnum that allows for parameters to be made.
 */
class ErrorResolver {
    /**
     * 
     * @param {string} resolverName - The name of the Resolver.
     * @param {string} errorKey - The Key to be resolved.
     * @param  {Object} params - The parameters for the Error.
     * 
     * @example
     * const Error = new ErrorResolver("console", "BuildError", { Reason: "Unable to provide reason." });
     * // resolverName, errorKey, params
     */
    constructor(resolverName, errorKey, params) {
        if(typeof resolverName !== "string") {
            throw new RawError("Custom Resolver Error", 'Name of resolver was not a String.');
        }

        if(typeof errorKey !== "string") {
            throw new RawError("Custom Resolver Error", "Key to resolve was not a String.");
        }

        if(typeof params !== "object" || Array.isArray(params) || params === null) {
            throw new RawError("Custom Resolver Error", "Params was not an object.");
        }

        this.name = resolverName;
        this.errorKey = errorKey;
        this.params = params;

        this.error = ErrorEnum[`resolve${groupName}`](errorKey);
        Object.entries.forEach(entry => {
            const key = entry[0];
            const value = entry[1];

            if(typeof value !== "string") {
                throw new RawError("Custom Resolver Error", "Parameter was not a String.");
            }

            this.error = this.error.replace(`<${key.toUpperCase()}>`, value);
        });

        return this.error;
    }
}

module.exports = { ErrorEnum, ErrorResolver };