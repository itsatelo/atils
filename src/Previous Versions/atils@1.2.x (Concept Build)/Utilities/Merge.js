const { ErrorClient } = require('../atils/ErrorClient.js');

/**
 * @class
 * @description - Merges two or more classes.
 */
class Merge {
    /**
     * Constructor method.
     * @param  {...any} classes - The classes to merge.
     * @returns {*} A class that's merged from all provided classes.
     */
    constructor(...classes) {
        this.classes = classes;
        this.vessel;
        this.#build();
        return this.vessel;
    }

    #build() {
        const classes = this.classes;
        this.vessel = class {
            constructor(...params) {
                classes.forEach(c => {
                    if(Array.isArray(params[classes.indexOf(c)])) {
                        Object.assign(this, new c(
                            ...params[classes.indexOf(c)]
                        ));
                    } else {
                        Object.assign(this, new c(params[classes.indexOf(c)]));
                    }
                });
            } 
        }
        
        this.classes.forEach(c => {
            if(c === undefined) return;
            Object.getOwnPropertyNames(c.prototype)
                .filter(property => property != "constructor")
                .map(property => {
                    this.vessel.prototype[property] = c.prototype[property];
                })
        });
    }
}

module.exports = { Merge };