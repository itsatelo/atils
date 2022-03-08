/**
 * @class
 * @description - Merges two or more classes together into one. *The earlier the class, the higher the priority.
 * 
 * @example
 * const { Merge } = require('atils');
 * class A { constructor() {} };
 * class B { constructor() {} };
 * class C extends new Merge(A, B) { constructor() { super(); } };
 */
class Merge {
    #classes;
    #vessel;
    constructor(...classes) {
        this.#classes = classes.reverse();
        this.#vessel = this.#build();
        return this.#vessel;
    }

    #build() {
        const classes = this.#classes;
        const vessel = class {
            constructor(...params) {
                classes.forEach(item => {
                    if(Array.isArray(params[classes.indexOf(item)])) Object.assign(this, new item(...params[classes.indexOf(item)]));
                    else Object.assign(this, new item(params[classes.indexOf(item)]));
                });
            }
        }

        classes.forEach(item => {
            if(item === undefined) return;
            Object.getOwnPropertyNames(item.prototype)
                .filter(propertyName => propertyName != "constructor")
                .map(propertyName => {
                    vessel.prototype[propertyName] = item.prototype[propertyName];
                });
        });

        return vessel;
    }
}

module.exports = Merge;