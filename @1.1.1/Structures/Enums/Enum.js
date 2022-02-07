const { ObjectUtil } = require('../../Utils/ObjectUtil.js');

/**
 * @class
 * @version 1.0.0
 * @description - A simple Enumerated Type to store locked data. Placed in [Groups]{@link EnumGroup}
 */
class Enum {
    #value;
    #options;
    #params;
    /**
     * Constructor method for the Enum.
     * @param {*} value - The value of the Enum.
     * @param {Object} options - Options for the Enum (unchangeable as of now).
     * @param {Array.<*>} params - An array of Params to store within the Enum.
     */
    constructor(value, options, params) {
        this.#value = value;
        this.#options = Object.assign({
            resolveable: true,
            group: undefined,
        }, options);
        this.#params = params;

        this.#params.forEach(param => {
            if(param === 'ALLOW ENUM CLONING') {
                this.clone = function() {
                    return {
                        value: this.#value,
                        params: this.#params
                    }
                };
            }
        });

        Object.freeze(this);
    }

    /**
     * Resolve's an Enum's data and returns it to the client.
     * @returns {Object} - The information stored within the Enum.
     */
    resolve() {
        if(this.resolveable === false) return undefined;
        return {
            value: this.#value,
            params: this.#params,
            group: this.#options.group,
        }
    }
}

function EnumStructure(i) {
    let gate = true;
    if(new ObjectUtil().isObject(i)) {
        const obj = new ObjectUtil(i);
        obj.keys().forEach(key => {
            if(key === 'name') {
                if(typeof obj['name'] !== 'string') {
                    gate = false;
                } else {
                }
            }
            if(key === 'value') {} // A Value can be anything.
            /*if(key === 'options') {
                if(obj['options'] instanceof Object && !Array.isArray(obj['options'])) {
                    if(typeof obj.options.resolveable !== "boolean") gate = false;
                }
            }*/ // Values not yet supported.
        });
    }

    return gate;
}

module.exports = { Enum, EnumStructure };