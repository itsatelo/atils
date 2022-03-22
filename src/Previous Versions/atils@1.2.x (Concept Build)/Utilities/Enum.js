const { ErrorClient } = require('../atils/ErrorClient.js');

const Invalid = function(key) {
    ErrorClient.create("InvalidEnum", `No Enum Value with ${key} as it's value could be found.`);
    ErrorClient.throw("InvalidEnum");
}

/**
 * @class
 * @description - Creates an Enum (via Resolvers then Items)
 * 
 * @example
 * const Example = new Enum({
 *   string: {
 *     text: "hello world",
 *   }
 * });
 * 
 * console.log(Example.resolveString("text"));
 * // you can also use Example.resolve("string"), which will return it as an object
 * // this will allow you to use Example.resolve("string").text
 */
class Enum {
    #values;
    constructor(enumInfo) {
        if(typeof enumInfo !== "object" || Array.isArray(enumInfo) || enumInfo === null) ErrorClient.throw('EnumTypeError');
        this.#values = enumInfo;
        Object.entries(enumInfo).forEach(entry => {
            let resolverName = entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
            this[`resolve${resolverName}`] = function(key) {
                if(this.#values[entry[0]][key]) {
                    return this.#values[entry[0]][key];
                } else return Invalid(key);
            }
        });

        this[`resolve`] = function(resolver) {
            if(resolver === 'atils*get-all-values') {
                return this.#values;
            } else if(this.#values[resolver]) {
                return this.#values[resolver];
            } else return Invalid(resolver);
        }

        Object.freeze(this);
    }
}

module.exports = { Enum };