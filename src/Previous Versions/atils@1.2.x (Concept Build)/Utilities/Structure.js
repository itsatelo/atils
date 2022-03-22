const { ErrorClient } = require('../atils/ErrorClient.js');
const { Enum } = require('./Enum.js');

const Structures = {
    ARRAY: ["array", "[]", [], Array],
    ANY: ["any", "*",],
    BIGINT: ["bigint", "#*", BigInt],
    BOOLEAN: ["boolean", '//', Boolean],
    ENUM: ["enum", "!", Enum],
    FUNCTION: ["function", "fn", "()", Function],
    NUMBER: ["number", "#", Number],
    OBJECT: ["object", "{}", Object],
    SMALLINT: ["smallint", "#!"],
    STRING: ["string", "''", '""', "``", String],
    SYMBOL: ["symbol", "@", Symbol],
    URL: ["url", "link", "://"],
}

/**
 * @class
 * @description - Creates a new Structure that can be used as a format for objects.
 */
class Structure {
    /**
     * @description - Constructor method for the Structure.
     * @param {Object} structure - An object to be referenced as a Structure.
     */
    constructor(structure) {
        if(isObject(structure) === false) ErrorClient.throw('StructureError');
        this.structure = structure;
    }

    /**
     * Determines if an Object matches a Structure.
     * @param {Object} object - An object to be determined if it matches the Structure.
     */
    is(object) {
        if(isObject(object) === false) ErrorClient.throw('StructureError');
        return determineIfMatches(this.structure, object);
    }
}

function isObject(item) {
    if(!typeof item === "object" || typeof item === "function" || Array.isArray(item) || item === null) return false;
    return true;
}

function determineIfMatches(base, object, previousGate) {
    let gate = previousGate ?? true;
    Object.keys(base).forEach(key => {
        if(!object[key]) gate = false;
        else {
            if((isObject(base[key] === true) && isObject(object[key]) === true) && typeof object[key] !== 'function' && /^\s*class\s+/.test(object[key].toString())) {
                const isFalse = determineIfMatches(base[key], object[key], gate);
                if(isFalse === false) gate = false;
            } else Object.keys(Structures).forEach(strKey => {
                if(Structures[strKey].includes(base[key])) {
                    if(strKey === "ARRAY") {
                        if(typeof object[key] !== "array") gate = false;
                    } else if(strKey === "ANY") {
                        // If it's any, then it doesn't need to check.
                    } else if(strKey === "BIGINT") {
                        if(typeof object[key] !== "bigint") gate = false;
                    } else if(strKey === "BOOLEAN") {
                        if(typeof object[key] !== "boolean") gate = false;
                    } else if(strKey === "ENUM") {
                        if(!object[key] instanceof Enum) gate = false;
                    } else if(strKey === "FUNCTION") {
                        if(typeof object[key] !== "function") gate = false;
                    } else if(strKey === "NUMBER") {
                        if(typeof object[key] !== "number" && typeof object[key] !== "bigint") gate = false;
                    } else if(strKey === "OBJECT") {
                        if(typeof object[key] !== "object" || typeof object[key] === "function") gate = false;
                    } else if(strKey === "SMALLINT") {
                        if(typeof object[key] !== "number") gate = false;
                    } else if(strKey === "STRING") {
                        if(typeof object[key] !== "string") gate = false;
                    } else if(strKey === "SYMBOL") {
                        if(typeof object[key] !== "symbol") gate = false;
                    } else if(strKey === "URL") {
                        if(typeof object[key] !== "string") gate = false;
                        let url;
                        try {
                            url = new URL(object[key]);
                        } catch(_) {
                            gate = false;
                        }
                    } else {};
                } else {};
            });
        }
    });
    return gate;
}

module.exports = { Structure };