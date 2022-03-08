const { Style, Color } = require('../Enums/ConsoleStyles.js');
const RawError = require('../Bases/RawError.js');

/**
 * @class
 * @description - A simple Error Builder with a customized catch method.
 * 
 * @example
 * const { ErrorBuilder } = require('atils');
 * const ExampleError = new ErrorBuilder('Example Error', 'This is an example.');
 * ExampleError.throw();
 */
class ErrorBuilder {
    #Message;
    #StackTrace;
    #CurrentDate;
    /**
     * Constructor method for the Error Builder.
     * @param {string} name - The name of the Error.
     * @param {string} message - The message of the Error.
     * @param {Object} [options] - Options for the Error.
     *   @param {Boolean} [options.date] - Whether to display the current date (in a MM/DD/YYYY HH:MM:SS format) within the Error.
     *   @param {Boolean} [options.stackTrace] - Whether to display the Stack Trace within the Error.
     *   @param {Boolean} [options.logStackTraces] - Whether to log Stack Traces into a folder (folder is made by atils).
     *   @param {Boolean} [options.autocatch] - Whether to automatically catch this Error when thrown.
     */
    constructor(name, message, options) {
        this.name = name;
        this.message = message;
        this.options = Object.assign({
            date: false,
            stackTrace: true,
            logStackTraces: false,
            autocatch: false,
        }, options);

        this.catching = this.options.autocatch ?? false;

        if(!name) {
            throw new RawError('ErrorBuilder Failed (EB-F.001)', 'No error name was provided.');
        }
        if(!message) {
            throw new RawError('ErrorBuilder Failed (EB-F.002)', 'No error message was provided.');
        }

        if(typeof options !== "object" && options !== undefined) {
            throw new RawError('ErrorBuilder Failed (EB-F.003)', 'Provided options were not within an Object.');
        }
        if(typeof this.options.date !== "boolean") {
            throw new RawError('ErrorBuilder Failed (EB-F.004)', 'Provided option (DATE) was not a Boolean.');
        }
        if(typeof this.options.stackTrace !== "boolean") {
            throw new RawError('ErrorBuilder Failed (EB-F.005)', 'Provided option (STACKTRACE) was not a Boolean.');
        }
        if(typeof this.options.logStackTraces !== "boolean") {
            throw new RawError('ErrorBuilder Failed (EB-F.006)', 'Provided option (LOGSTACKTRACES) was not a Boolean.');
        }
        if(typeof this.options.autocatch !== "boolean") {
            throw new RawError('ErrorBuilder Failed (EB-F.007)', 'Provided option (AUTOCATCH) was not a Boolean.');
        }

        if(typeof name !== "string") {
            throw new RawError('ErrorBuilder Failed (EB-F.008)', 'The provided name was not a String.');
        }

        if(typeof message !== "string") {
            throw new RawError('ErrorBuilder Failed (EB-F.009)', 'The provided message was not a String.');
        }

        const Message = [];
        this.#StackTrace = this.#getStackTrace();
        this.#CurrentDate = this.#getDate(new Date());

        Message.push(`${Color('red')}${Style('bright')}${this.name}${Style('default')}: `);
        Message.push(`${Style('bright')}${this.message}${Style('default')} `);

        

        if(this.options.date === true) Message.push(`\n${Style('dim')}${this.#CurrentDate}`);
        if(this.options.stackTrace === true) Message.push(`\n${Style('dim')}${Color('purple')}${this.#StackTrace}${Style('default')}`);

        this.#Message = Message.join('');
    }

    /**
     * Throws the error.
     * @example
     * ExampleError.throw();
     */
    throw() {
        if(this.options.logStackTraces === true) {
            const fs = require('fs');
            if(!fs.existsSync('./atils')) {
                fs.mkdirSync('./atils');
            }

            let fileNumber = 0;

            fs
                .readdirSync('./atils')
                .filter(file => file.endsWith('.atils.error'))
                .map(file => {
                    fileNumber += 1;
                });

            fs
                .writeFileSync(`./atils/${fileNumber + 1}.atils.error`, `atils threw a new Error\n\n${this.name}: ${this.message}\n${this.#CurrentDate}\n${this.#StackTrace}`, function(error) {
                    if(error) return;
                });
        }

        if(this.catching === false) {
            console.log(this.#Message);
            process.exit();
        } else {
            console.log(this.#Message);
        }
    }

    /**
     * Enables/Disables "Catch Mode", a simple Catching Mechanism for the Error Builder.
     * @param {Boolean} [enable] - Whether Catch Mode should be enabled or disabled. 
     * 
     * @example
     * ExampleError.catch(true);
     * ExampleError.throw();
     * // Console Output:
     * // Example Error: This is an example.
     */
    catch(enable) {
        this.catching = enable ?? true;
    }

    /**
     * Forces an Error to be thrown; disregards Catch Mode.
     * 
     * @example
     * ExampleError.catch(true);
     * ExampleError.force();
     */
    force() {
        this.catching = false;
        this.throw();
    }

    #getStackTrace() {
        const obj = {};
        Error.captureStackTrace(obj, this);
        let stack = obj.stack.split('at');
        stack[0] = 'Stack Trace:\n    ';
        stack = stack.join('at');

        return stack;
    }

    #getDate(date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const mins = date.getMinutes();
        const hours = date.getHours();
        const seconds = date.getSeconds();

        return `${day}/${month}/${year} ${hours}:${mins}:${seconds}`;
    }
}

module.exports = ErrorBuilder;