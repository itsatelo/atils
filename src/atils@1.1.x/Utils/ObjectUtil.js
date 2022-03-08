const { ErrorBuilder } = require('./ErrorUtil.js');
const { ConsoleStyles } = require('../Structures/ConsoleStyles.js');

/**
 * @class
 * @version 1.1.0
 * @description Creates a new form of Object with more utilities than a standard Object.
 */
class ObjectUtil {
    #keys;
    #values;
    /**
     * Constructor method for Object Util.
     * @example
     * const obj = new ObjectUtil({ a: 1, b: 2 });
     * obj.c = 3;
     * console.log(obj.a, obj.b, obj.c);
     * @param  {...Object} objects - Any Objects you would like to convert into an ObjectUtil. Earlier Objects take priority.
     */
    constructor(...objects) {
        this.#keys = [];
        this.#values = [];

        //console.log(`${ConsoleStyles.TextColors.Red}This feature is still underdeveloped.${ConsoleStyles.TextColors.White}\nIf you'd like to suggest features, submit a PR on the GitHub @ itsatelo/atils.`);
        this.assign(...objects);
    }

    /**
     * Assigns the entries of other Objects/ObjectUtils to the ObjectUtil
     * @example
     * // expected output: [ [ 'a', 1 ], [ 'b', 2 ], ['c', 3 ] ]
     * const obj = new ObjectUtil();
     * obj.assign({ a: 1 }, { b: 2, c: 3});
     * console.log(obj.entries());
     * @param  {...Object|ObjectUtil} sources - The Objects/ObjectUtils you would like to add.
     */
    assign(...sources) {
        if(this.isFrozen()) return;
        sources.reverse().forEach(object => {
            if(!typeof object === "object" || Array.isArray(object) || object === null) new ErrorBuilder('ObjectBuilderError', 'Provided Object was not an Object.', { date: true, stackTrace: true });
            Object.keys(object).forEach(key => {
                if(this.#keys.includes(key)) {
                    this.#keys.splice(this.#keys.indexOf(key), 1, key);
                    this.#values.splice(this.#keys.indexOf(key), 1, object[key]);
                } else {
                    this.#keys.push(key);
                    this.#values.push(object[key]);
                }
                
            });
        });

        this.#keys.forEach(key => {
            this[key] = this.#values[this.#keys.indexOf(key)];
        });
    }

    /**
     * Returns a new instance of the current ObjectUtil.
     * @example
     * // returns new ObjectUtil
     * const obj = new ObjectUtil({ a: 1 });
     * const obj2 = obj.copy();
     * @returns {ObjectUtil} - A new instance of the ObjectUtil with the same parameters.
     */
    copy() {
        const object = {};
        this.entries().forEach(entry => {
            object[entry[0]] = entry[1];
        });

        return new this.constructor(object);
    }

    /**
     * Returns an array containing all of the [key, value] pairs of the ObjectUtil.
     * @param {Array.<string>|string} [keys] - A filter for which keys you would like returned.
     * @example
     * // expected output: [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3] ]
     * const obj = new ObjectUtil({ a: 1, b: 2, c: 3});
     * console.log(obj.entries());
     * @returns {Array.<Array>} - An array of all (filtered) Key Value pairs.
     */
    entries(...keys) {
        if(keys.length > 0) {
            const entries = [];
            keys.forEach(key => {
                if(this[key]) {
                    entries.push([key, this[key]]);
                }
            });

            return entries;
        } else return Object.entries(this);
    }

    /**
     * Freezes the ObjectUtil so that properties cannot be changed or removed.
     */
    freeze() {
        Object.freeze(this);
    }

    /**
     * Determines if this instance of the ObjectUtil has been frozen.
     * @returns {Boolean} - Whether this instance of the ObjectUtil is frozen.
     */
    isFrozen() {
        if(Object.isFrozen(this)) return true;
        return false;
    }

    /**
     * Determines if a target is an Object or ObjectUtil.
     * @param {any} target - the item to determine if is an Object or ObjectUtil.
     * @returns {Boolean} - Whether the target is an Object or ObjectUtil.
     */
    isObject(target) {
        if((target instanceof Object && typeof target !== Array) || target instanceof ObjectUtil) return true;
        return false;
    }

    /**
     * Determines if this instance of the ObjectUtil has been sealed.
     * @returns {Boolean} - Whether this instance of the ObjectUtil is sealed.
     */
    isSealed() {
        if(Object.isSealed(this)) return true;
        return false;
    }

    /**
     * Returns an Array of every key in this instance of the ObjectUtil.
     * @returns {Array.<string>} - An Array of every Key in the ObjectUtil.
     */
    keys() {
        const keys = [];
        this.entries().forEach(entry => {
            keys.push(entry[0]);
        });

        return keys;
    }

    /**
     * Creates a new Map instance containing all Keys and Values of the ObjectUtil instance.
     * @returns {Map} - A Map of all K:V pairs.
     */
    map() {
        const entries = this.entries();
        return new Map(entries);
    }

    /**
     * Prevents extensions to this instance of the ObjectUtil.
     */
    preventExtensions() {
        Object.preventExtensions(this);
    }

    /**
     * Prevents the deletion of values from this instance of the ObjectUtil.
     */
    seal() {
        Object.seal(this);
    }

    /**
     * Returns an Array of every value in this instance of the ObjectUtil.
     * @returns {Array.<any>} - An Array of every Value in the ObjectUtil.
     */
    values() {
        const values = [];
        this.entries().forEach(entry => {
            values.push(entry[1]);
        });

        return values;
    }
}

module.exports = { ObjectUtil };