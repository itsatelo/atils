const { ConsoleStyles } = require('../Structures/ConsoleStyles.js');
const { exec } = require('child_process');

/**
 * @deprecated @class @extends [Error]{@link https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/error}
 * @version 1.0.0
 * @description Basic Error Building Class. Deprecated in favor of the {@link ErrorBuilder}.
 * 
 * @example
 * throw new BaseError('Example Error', 'This is an example error.');
 */
class BaseError extends Error {
    /**
     * Basic parameters for the Error.
     * @param {string} name - The name of the Error.
     * @param {string} message - The message of the Error.
     */
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

/**
 * @class
 * @version 1.0.0
 * @description Basic Error Building Class. Allows for customizability.
 * 
 * @example
 * new ErrorBuilder('Example Error', 'This is an example error.', { date: false, stackTrace: true });
 */
class ErrorBuilder {
    /**
     * 
     * @param {string} name - The name of the Error to be thrown.
     * @param {string} message - The message of the Error to be thrown.
     * @param {Object} [options] - Any options to customize the Error.
     *   @param {Boolean} [options.date] - Whether you would like the current date to be visible in the Error.
     *   @param {Boolean|string} [options.stackTrace] - Whether you would like the Stack Trace to be visible in the Error. Providing a string labelled "FILE" will write the Error into a file as well.
     *   @param {Array.ConsoleStyles} [options.titleStyles] - An Array of {@link ConsoleStyles} provided by Atils for styling the name.
     *   @param {Array.ConsoleStyles} [options.messageStyles] - An Array of {@link ConsoleStyles} provided by Atils for styling the message.
     *   @param {Array.ConsoleStyles} [options.stackTraceStyles] - An Array of {@link Enums} provided by Atils for styling the stack trace.
     */
    constructor(name, message, options) {
        this.options = Object.assign({
            date: false,
            stackTrace: true,

            titleStyles: [ConsoleStyles.TextColors.Red],
            messageStyles: [ConsoleStyles.TextColors.White],
            stackTraceStyles: [ConsoleStyles.TextColors.White, ConsoleStyles.Styles.Dim],
        }, options);
        this.name = name;
        this.message = message;

        if(!this.name) throw new BaseError('AtilsBaseError', 'No name was provided for the Error.');
        if(!this.message) throw new BaseError('AtilsBaseError', 'No message was provided for the Error.');
        
        let msg = [];

        if(this.options.titleStyles.length === 0) message.push(this.name);
        else {
            const nameStyles = [];
            this.options.titleStyles.forEach(style => {
                nameStyles.push(style);
            });
            msg.push(`${nameStyles.join('')}${this.name}${ConsoleStyles.Styles.Blank}: `);
        }

        if(this.options.messageStyles.length === 0) msg.push(this.message);
        else {
            const messageStyles = [];
            this.options.messageStyles.forEach(style => {
                messageStyles.push(style);
            });

            msg.push(`${messageStyles.join('')}${this.message}${ConsoleStyles.Styles.Blank}`);
        }

        if(this.options.date === true) {
            msg.push(`\n${ConsoleStyles.Styles.Dim}${new Date().toGMTString()}${ConsoleStyles.Styles.Blank}`);
        }

        if(this.options.stackTrace === true) {
            let obj = {};
            Error.captureStackTrace(obj, this);
            let stack = obj.stack.split('at');
            stack[0] = 'Stack Trace:\n    ';
            stack = stack.join('at');
            if(this.options.stackTraceStyles.length === 0) message.push(`\n${stack}`);
            else {
                const stackStyles = [];
                this.options.stackTraceStyles.forEach(style => {
                    if(ConsoleStyles.resolve(style)) stackStyles.push(style);
                });

                

                msg.push(`\n${stackStyles.join('')}${stack}${ConsoleStyles.Styles.Blank}`);
            }
        }

        this.msg = msg.join('');

        console.log(this.msg);
        process.exit();
    }

}

module.exports = { ErrorBuilder, BaseError };