const { ErrorUtility, ErrorUtil } = require('./Error.js');

/**
 * @class
 * @description A simple key-value storage system that resets upon restart. Expect this to be rewritten in v1.0.9
 */
class CollectionUtility {
    #options = {};
    /**
     * @constructor
     * @description Creates the Collection.
     */
    constructor() {
        this.Keys = [];
        this.Values = [];

        this.CachedKeys = [];
        this.CachedValues = [];
    }

    /**
     * @description Removes all Keys and Values from the Collection, as well as from its Cache.
     */
    clear() {
        this.Keys = [];
        this.Values = [];
        this.CachedKeys = [];
        this.CachedValues = [];
    }

    /**
     * @description Removes all Keys and Values from the Collection, with the exceptions of its Cache and any provided Keys.
     * @param {string|string[]} [skip] - A list of Keys that are to be skipped over when resetting the Collection.
     */
    reset(skip) {
        const newKeys = [];
        const newValues = [];
        if (skip) {
            this.Keys.forEach(key => {
                if (skip.includes(key) || skip === key) {
                    newKeys.push(key);
                    newValues.push(this.Values[this.Keys.indexOf(key)]);
                }
            });
        }

        this.Keys = newKeys;
        this.Values = newValues;
    }

    /**
     * @description Sets a new Value to a Pair.
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value) {
        if (!typeof key === 'string' && !key instanceof String) throw new ErrorUtility("CollectionError", "Keys must be Strings.");
        let index;
        if (this.Keys.includes(key)) {
            index = this.Keys.indexOf(key);
        }

        if (index !== undefined) {
            this.Values[index] = value;
        } else {
            this.Keys.push(key);
            this.Values.push(value);
        }
    }

    /**
     * Saves all Key Value pairs from an Object into the Collection.
     * @param {Object} object - Object containing all Keys and Values to be saved.
     */
    addFromObject(object) {
        if (!typeof object === "object" || Array.isArray(object) || object === null) throw new ErrorUtility("ObjectDisassemblyError", "Unable to disassemble what isn't an Object.");
        const Keys = [];
        const Values = [];

        Object.keys(object).forEach(key => {
            Keys.push(key);
        });

        Object.values(object).forEach(value => {
            Values.push(value);
        });

        Keys.forEach(key => {
            this.set(key, Values[Keys.indexOf(key)]);
        });
    }

    /**
     * @description Merges the provided list of [Collections]{@link CollectionUtility} into this Collection.
     * @param {Array} collections - The [Collections]{@link CollectionUtility} to be merged within this one.
     */
    merge(collections) {
        const saveKeys = this.Keys;
        const saveValues = this.Values;
        if (Array.isArray(collections)) {
            collections.forEach(collection => {
                collection.Keys.forEach(key => {
                    this.set(key, collection.Values[collection.Keys.indexOf(key)]);
                });
            });

            saveKeys.forEach(key => {
                this.set(key, saveValues[saveKeys.indexOf(key)]);
            });
        } else {
            const collection = collections;
            collection.Keys.forEach(key => {
                this.set(key, collection.Values[collection.Keys.indexOf(key)]);
            });

            saveKeys.forEach(key => {
                this.set(key, saveValues[saveKeys.indexOf(key)]);
            });
        }
    }
    /**
     * @description Removes a key-value pair from the Collection.
     * @param {string|string[]} keys - The list of Keys to be removed.
     */
    delete(keys) {
        if (Array.isArray(keys)) {
            keys.forEach(key => {
                if (this.Keys.includes(key)) {
                    this.Values.splice(this.Keys.indexOf(key), 1);
                    this.Keys.splice(this.Keys.indexOf(key), 1);
                }
            });
        } else {
            if (this.Keys.includes(keys)) {
                const key = keys;
                this.Values.splice(this.Keys.indexOf(key), 1);
                this.Keys.splice(this.Keys.indexOf(key), 1);
            }
        }
    }


    /**
     * @description Obtains the Values stored with specific Keys and returns it.
     * @param {string|string[]} keys - Keys that will be returned.
     * @returns {*|Array} Value of the specified Keys.
     */
    get(keys) {
        if (Array.isArray(keys)) {
            const returns = [];
            keys.forEach(key => {
                if (typeof key !== string && !key instanceof String) throw new ErrorUtility("CollectionError", "Provided Keys must be Strings.");
                if (this.Keys.includes(key)) {
                    returns.push(this.Values[this.Keys.indexOf(key)]);
                } else returns.push(undefined);
            });

            return returns;
        } else {
            const key = keys;
            if (typeof key !== "string" && !key instanceof String) throw new ErrorUtility("CollectionError", "Provided Keys must be Strings.");
            if (this.Keys.includes(key)) {
                return this.Values[this.Keys.indexOf(key)];
            } else return undefined;
        }
    }
    /**
     * @description Obtains the Values stored at specific IDs and returns it.
     * @param {number|number[]} ids - A list of numerical values that will be used to return a Value.
     * @returns {*} Value obtained via an ID.
     */
    at(ids) {
        if (Array.isArray(ids)) {
            const returns = [];
            ids.forEach(id => {
                if (isNaN(id)) throw new ErrorUtility("CollectionError", "Provided IDs must be Numbers.");
                if (this.Values[id] !== undefined && this.Values[id] !== null) {
                    returns.push(this.Values[id]);
                } else returns.push(undefined);
            });

            return returns;
        } else {
            const id = ids;
            if (isNaN(id)) throw new ErrorUtility("CollectionError", "Provided IDs must be Numbers.");
            if (this.Values[id] !== undefined && this.Values[id] !== null) {
                return this.Values[id];
            } else return undefined;
        }
    }

    /**
     * @description Obtains the first Value of the Collection.
     * @returns {*} First Value in the Collection.
     */
    first() {
        return this.Values[0];
    }
    /**
     * @description Obtains the last Value of the Collection.
     * @returns {*} Last Value in the Collection.
     */
    last() {
        return this.Values[this.Values.length];
    }

    /**
     * @description Returns all Values within the Collection.
     * @returns {Array} All values within the Collection.
     */
    all() {
        return this.Values;
    }


    /**
     * @description Checks to see if the Collection has the specified Values, and returns their IDs.
     * @param {*} values Values to check if the Collection has.
     * @returns {number|number[]} IDs of the specified Values.
     */
    has(values) {
        if (Array.isArray(values)) {
            const returns = [];
            values.forEach(value => {
                if (this.Values.includes(value)) {
                    returns.push(this.Values.indexOf(value));
                } else returns.push(undefined);
            });

            return returns;
        } else {
            const value = values;
            if (this.Values.includes(value)) {
                return this.Values.indexOf(value);
            } else return undefined;
        }
    }

    /**
     * @description Checks to see if the Collection has the specified Keys, and returns their IDs.
     * @deprecated Please use [Collection#get()]{@link CollectionUtility.get}
     * @param {string|string[]} keys - Keys to check if the Collection has.
     * @returns {number|number[]} IDs of the specified Keys.
     */
    exists(keys) {
        if (Array.isArray(keys)) {
            const returns = [];
            keys.forEach(key => {
                if (this.Keys.includes(key)) {
                    returns.push(this.Keys.indexOf(key));
                } else returns.push(undefined);
            });

            return returns;
        } else {
            const key = keys;
            if (this.Keys.includes(key)) {
                return this.Keys.indexOf(key);
            } else return undefined;
        }
    }


    /**
     * @description Refreshes the Cache of the Collection.
     */
    cache() {
        this.CachedKeys = this.Keys;
        this.CachedValues = this.Values;
    }

    /**
     * @description Returns an [Object]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object} with all of the Cache's data.
     * @returns {Object} Data within the Cache.
     */
    getCache() {
        const returns = {};
        this.CachedKeys.forEach(key => {
            const value = this.CachedValues[this.CachedKeys.indexOf(key)];
            Object.assign(returns, { [key]: value });
        });

        return returns;
    }

    /**
     * @description Clears the Cache.
     */
    clearCache() {
        this.CachedKeys = [];
        this.CachedValues = [];
    }

    /**
     * Turns the Collection into an Object.
     * @returns {Object} An [Object]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object} containing all of the Collection's Data.
     */
    objectify() {
        const returns = new Object();
        const vals = [];
        this.Values.forEach(value => {
            vals.push(JSON.stringify(value));
        });

        this.Keys.forEach(key => {
            const json = JSON.stringify(key);
            vals.forEach(val => {
                if (vals.indexOf(val) === this.Keys.indexOf(key)) {
                    Object.assign(returns, { [key]: val });
                }
            });
        });

        return returns;
    }
}

module.exports = { CollectionUtility };
