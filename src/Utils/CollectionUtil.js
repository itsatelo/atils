const { CollectionError } = require('./Presets/Errors.js');

/**
 * A one-use storage system that works in key-value pairs.
 * @class
 */
class Collection {
    /**
     * Creates two arrays that will be used as the Collection.
     */
    constructor() {
        this.Keys = [];
        this.Values = [];
    }

    get all() {
        return this.all();
    }

    /**
     * Removes everything from both the Keys and Values.
     */
    clear() {
        this.Keys = [];
        this.Values = [];
    }

    /**
     * Sets a value within the Collection.
     * @param {string} key - The key that the value will be stored under.
     * @param {*} value - The value that will be stored under the key.
     */
    set(key, value) {
        if(!key || !value) {
            throw new CollectionError("Cannot set an empty key or value.");
        }

        if(!key instanceof String || typeof key !== "string") {
            throw new CollectionError("Collection Keys must be strings.");
        }

        if(this.Keys.includes(key)) {
            const index = this.Keys.indexOf(key);
            this.Values.splice(index, 1, value);
        } else {
            this.Keys.push(key);
            this.Values.push(value);
        }
    }

    /**
     * Returns an array containing objects of every key and value in the Collection.
     */
    all() {
        const toReturn = [];
        this.Keys.map(key => {
            const index = this.Keys.indexOf(key);
            toReturn.push({ key: key, value: this.Values[index] });
        });
    }

    /**
     * 
     * @param {string} key - The key to be checked for.
     * @returns {boolean} Whether the key is stored or not.
     */
    exists(key) {
        if(this.Keys.includes(key)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if all of the provided keys is an array.
     * @param {Object[]} keys - The keys to check for.
     * @returns {boolean} Whether all of the keys are stored or not.
     */
    allExists(keys) {
        let bool = true;
        if(!Array.isArray(keys)) {
            if(!key instanceof String || typeof key !== "string") {
                return false;
            }
            return this.exists(keys);
        } else {
            keys.forEach(key => {
                if(!key instanceof String || typeof key !== "string") {
                    bool = false;
                }
                if(!this.Keys.includes(key)) bool = false;
            });

            return bool;
        }
    }

    /**
     * 
     * @param {Object[]} keys - The keys to check for.
     * @returns {boolean} Whether any of the keys are stored or not.
     */
    anyExists(keys) {
        let bool = false;
        if(!Array.isArray(keys)) {
            if(!key instanceof String || typeof key !== "string") {
                return false;
            }
            return this.exists(keys);
        } else {
            keys.forEach(key => {
                if(!key instanceof String || typeof key !== "string") {
                    bool = false;
                }
                if(this.Keys.includes(key)) bool = true;
            });

            return bool;
        }
    }

    /**
     * Returns true if the Collection contains a value.
     * @param {*} value - The value to be checked for.
     * @return {boolean} Whether the value is stored or not.
     */
    has(value) {
        if(this.Values.includes(value)) {
            return true;
        } else { 
            return false; 
        }
    }

    /**
     * Returns the first item in the Collection.
     * @returns {Object} The first Key and Value (item) in the Collection.
     */
    first() {
        return { key: this.Keys[0], value: this.Values[0] };
    }

    /**
     * 
     * @param {string} key - The key to check for.
     * @returns {*} The value stored under the key.
     */
    get(key) {
        if(this.Keys.includes(key)) {
            const index = this.Keys.indexOf(key);
            return this.Values[index];
        } else return undefined;
    }

    /**
     * 
     * @param {*} value - The value to check for.
     * @returns {string} The key stored above the value.
     */
    getByValue(value) {
        if(this.Values.includes(value)) {
            const index = this.Keys.indexOf(value);
            return this.Keys[index];
        } else return undefined;
    }

    at(index) {
        if(isNaN(index)) return null;
        return this.Values[index];
    }
}

module.exports = { Collection };