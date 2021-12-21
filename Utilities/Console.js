const { ErrorUtility } = require('./Error.js');
const { ObjectUtility } = require('./Object.js');
const { DateUtility } = require('./Date.js');

/**
 * @class
 * @description An easier way to log items within your console, or externally.
 */
class ConsoleUtility {
    #options;
    /**
     * @constructor
     * @description Sets the options for the Utility, and allows for usage.
     * @param {Object} [options] - The options for the Utility. 
     */
    constructor({ autoDate = false } = {}) {
        this.#options = {
            autoDate: autoDate,
        };
    }

    /**
     * @description Automatically logs specified information to the console.
     * @param {string} name - The name of the Log that will be used.
     * @param {string} msg - The message of the Log that will be used.
     * @param {*} [info] - Any extra information for the Log that will be used.
     */
    log(name, msg, info) {
        if (!name || !msg || (typeof name !== "string" && !name instanceof String) || (typeof msg !== "string" && !name instanceof String)) throw new ErrorUtility("ConsoleError", "Specified name and message must be Strings and available.");
        let message;
        if (!info) {
            message = `\x1b[32m${name} \x1b[0m${msg}`;
        } else if (Array.isArray(info)) {
            let items = [];
            info.forEach(item => {
                if (typeof item === "object" && !Array.isArray(item) && item !== null) {
                    const obj = new ObjectUtility(item);
                    const dis = obj.disassemble();
                    items.push("    \x1b[35mObject:\n")
                    dis.keys.forEach(key => {
                        items.push(`        \x1b[33m${key}\x1b[0m: \x1b[36m${dis.values[dis.keys.indexOf(key)]}\x1b[0m,\n`);
                    });
                } else {
                    items.push(`    \x1b[35m${item}\x1b[0m,\n`);
                }
            });
            message = `\x1b[32m${name} \x1b[0m${msg}: \n\x1b[35m${items.join('\x1b[0m')}`;
        } else if (typeof info === "object" && !Array.isArray(info) && info !== null) {
            const i = [];
            const obj = new ObjectUtility(info);
            const dis = obj.disassemble();

            dis.keys.forEach(key => {
                let items = [];
                let color = "\x1b[33m";

                const value = dis.values[dis.keys.indexOf(key)];
                if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                    const obj2 = new ObjectUtility(value);
                    const dis2 = obj2.disassemble();

                    color = "\x1b[35m";
                    dis2.keys.forEach(k => {
                        console.log(k);
                        items.push(`\n        \x1b[33m${k}\x1b[0m: \x1b[36m${dis2.values[dis2.keys.indexOf(k)]}`);
                    });
                } else {
                    items.push(value);
                }

                i.push(`${color}${key}\x1b[0m: \x1b[35m${items.join('\x1b[0m,')}`);
            });

            message = `\x1b[32m${name} \x1b[0m${msg}: \n    ${i.join('\n    ')}`;
        } else {
            message = `\x1b[32m${name} \x1b[0m${msg}: \n    \x1b[33m${info}`;
        }

        if (this.#options.autoDate === true) message = message + `\n    \x1b[35mCurrent Date\x1b[0m: \x1b[36m${new DateUtility({ display: { militaryTime: false, displayInNumbers: true } })()}`;

        console.log(message + '\x1b[0m');
    }

    /**
     * @description Builds a console message, but returns it instead of logging it.
     * @param {string} name - The name of the Log that will be used.
     * @param {string} msg - The message of the Log that will be used.
     * @param {*} [info] - Any extra information for the Log that will be used.
     * @returns {string} The built message.
     */
    build(name, messgae, info) {
        if (!name || !msg || (typeof name !== "string" && !name instanceof String) || (typeof msg !== "string" && !name instanceof String)) throw new ErrorUtility("ConsoleError", "Specified name and message must be Strings and available.");
        let message;
        if (!info) {
            message = `\x1b[32m${name} \x1b[0m${msg}`;
        } else if (Array.isArray(info)) {
            let items = [];
            info.forEach(item => {
                if (typeof item === "object" && !Array.isArray(item) && item !== null) {
                    const obj = new ObjectUtility(item);
                    const dis = obj.disassemble();
                    items.push("    \x1b[35mObject:\n")
                    dis.keys.forEach(key => {
                        items.push(`        \x1b[33m${key}\x1b[0m: \x1b[36m${dis.values[dis.keys.indexOf(key)]}\x1b[0m,\n`);
                    });
                } else {
                    items.push(`    \x1b[35m${item}\x1b[0m,\n`);
                }
            });
            message = `\x1b[32m${name} \x1b[0m${msg}: \n\x1b[35m${items.join('\x1b[0m')}`;
        } else if (typeof info === "object" && !Array.isArray(info) && info !== null) {
            const i = [];
            const obj = new ObjectUtility(info);
            const dis = obj.disassemble();

            dis.keys.forEach(key => {
                let item;
                let color = "\x1b[33m";

                const value = dis.values[dis.keys.indexOf(key)];
                if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                    const obj2 = new ObjectUtility(value);
                    const dis2 = obj2.disassemble();

                    color = "\x1b[35m";
                    dis2.keys.forEach(k => {
                        item = `\n        \x1b[33m${k}\x1b[0m: \x1b[36m${dis2.values[dis2.keys.indexOf(k)]}`;
                    });
                } else {
                    item = value;
                }

                i.push(`${color}${key}\x1b[0m: \x1b[35m${item}`);
            });

            message = `\x1b[32m${name} \x1b[0m${msg}: \n    ${i.join('\n    ')}`;
        } else {
            message = `\x1b[32m${name} \x1b[0m${msg}: \n    \x1b[33m${info}`;
        }
        if (autoDate === true) message = message + `\x1b[35mCurrent Date\x1b[0m: \x1b[36m${new DateUtility()}`;
        return message;
    }
}

module.exports = { ConsoleUtility };