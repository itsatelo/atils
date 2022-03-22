class BaseError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

/**
 * @class
 * @description - Basic Error Building Class.
 * 
 * @example
 * new Error('Example Error', 'This is an example error.', { date: false, trace: true, log: false });
 */
class ErrorBuilder {
    /**
     * @description Constructor method for the ErrorBuilder.
     * @param {string} name - The name of the Error to be thrown.
     * @param {string} message - The message of the Error to be thrown.
     * @param {Object} [options] - The options of the Error to be thrown.
     *   @param {Boolean} [options.date] - Whether or not the current Date should be shown.
     *   @param {Boolean} [options.trace] - Whether or not the Stack Trace should be shown.
     *   @param {Boolean} [options.log] - Whether or not the Error should log the Stack Trace into a file.
     */
    constructor(name, message, options) {
        this.name = `\x1b[31m\x1b[1m${name}\x1b[0m`;
        this.message = `${message}\x1b[0m`;
        this.options = Object.assign({
            date: false,
            trace: true,
            log: false,
        }, options);

        if(!name) throw new BaseError('Atils Error', 'No name was provided for the Error.');
        if(!message) throw new BaseError('Atils Error', 'No message was provided for the Error.');

        let msg = [];
        msg.push(`${this.name}: `);
        msg.push(`${this.message} `);

        const stack = this.#stackTrace();
        const date = new Date()

        if(this.options.date === true) msg.push(`\n\x1b[2m${date}\x1b[0m`);
        if(this.options.trace === true) msg.push(`\n\x1b[2m${stack}\x1b[0m`);

        msg = msg.join('');
        console.log(msg);

        if(this.options.log === true) {
            const fs = require('fs');
            if(!fs.existsSync('./atils')) {
                fs.mkdirSync('./atils');
            }

            const date2 = this.#dateTrace();

            fs.writeFileSync(`./atils/${date2}.txt`, `${date}\n${stack}`, function(err) {
                if(err) throw err;
            });
        }

        process.exit();
    }

    #stackTrace() {
        const obj = {};
        Error.captureStackTrace(obj, this);
        let stack = obj.stack.split('at');
        stack[0] = 'Stack Trace:\n    ';
        stack = stack.join('at');

        return stack;
    }

    #dateTrace() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const mins = date.getMinutes();
        const hours = date.getHours();
        const seconds = date.getSeconds();

        return `Error ${day}.${month}.${year} ${hours}.${mins}.${seconds}`
    }
}

/**
 * @class
 * @description - A Client for managing and creating Errors.
 */
class ErrorClient {
    #catchErrors;
    #disabled;
    /**
     * @description Constructor method for the ErrorClient.
     * @param {Object} [options] - Options for all Errors.
     *   @param {Boolean} [options.date] - Whether or not the current Date should be shown for all Errors.
     *   @param {Boolean} [options.trace] - Whether or not the Stack Trace should be shown for all Errors.
     *   @param {Boolean} [options.log] - Whether or not the Errors should log the Stack Trace into a file.
     */
    constructor(options) {
        this.options = options;
        this.errors = [];

        this.#catchErrors = false;
        this.#disabled = false;
    }

    /**
     * @description Saves an Error to the Client in which it can be thrown later.
     * @param {string} name - The name of the Error to be saved.
     * @param {string} message - The message of the Error to be saved.
     * 
     * @example
     * const client = new ErrorClient();
     * client.create('Example Error', 'This is an example Error.');
     */
    create(name, message) {
        if(this.#disabled === true) return;
        const error = Object.assign({
            name: "ErrorClient",
            message: "No message was provided.",
        }, { name, message});
        if(this.errors.includes(error)) return;
        this.errors.forEach(err => {
            if(err.name === error.name) {
                this.errors[this.errors.indexOf(err)] = { name: err.name, message: err.message };
            }

            return;
        });
        this.errors.push(error);
    }

    /**
     * Throws a new [Error]{@link ErrorBuilder} found with the provided name.
     * @param {string} name - The name of the Error to be found and thrown.
     * @returns {string} - The Error name and message (if [catchErrors]{@link ErrorClient.catchErrors} is enabled).
     * 
     * @example
     * client.throw('Example Error');
     */
    throw(name) {
        let err;
        this.errors.forEach(error => {
            if(error.name = name) err = error;
        });

        if(!err) return;

        if(this.#catchErrors === false) {
            new ErrorBuilder(err.name, err.message, this.options);
        } else {
            console.log(`\x1b[36mCaught Error: \x1b[31m\x1b[1m${err.name}\x1b[0m:`, `${err.message}\x1b[0m`);
            return `\x1b[31m\x1b[1m${err.name}\x1b[0m`, `${err.message}\x1b[0m`;
        }
    }

    /**
     * @description - Toggles whether Errors for this ErrorClient should be caught.
     * @example
     * client.catchErrors();
     * client.throw('Example Error');
     * // Will not exit the process, but will return and log the Error.
     * client.catchErrors();
     * client.throw('Example Error');
     * // Will exit the process.
     */
    catchErrors() {
        if(this.#catchErrors === true) this.#catchErrors = false;
        else this.#catchErrors = true;

        return this.#catchErrors;
    }

    /**
     * @description - Prevents any new Errors from being created, but not from being thrown.
     * @example
     * client.disable();
     * client.create('Example Error Two', 'This is another example Error!');
     * client.throw('Example Error Two');
     * // nothing will happen
     */
    disable() {
        this.#disabled = true;
    }
}

module.exports = { ErrorBuilder, ErrorClient };