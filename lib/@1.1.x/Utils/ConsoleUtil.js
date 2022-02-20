const { ErrorBuilder } = require('./ErrorUtil.js');
const { AtilsError, ConsoleError } = require('./Errors/!Exports.js');
const { ConsoleStyles } = require('../Structures/ConsoleStyles.js');
const { ObjectUtil } = require('./ObjectUtil.js');

/**
 * @class
 * @version 1.3.0
 * @description A better way to manage information in the Console.
 */
class ConsoleUtil {
    /**
     * Constructor method for ConsoleUtil.
     * @param {Object} [options] - The Options for the ConsoleUtil.
     *  @param {Array} [options.titleStyles] -  An Array of {@link ConsoleStyles} provided by Atils for styling the titles of what you log.
     *  @param {Array} [options.messageStyles] -  An Array of {@link ConsoleStyles} provided by Atils for styling the messages of what you log.
     *  @param {Array} [options.infoStyles] -  An Array of {@link ConsoleStyles} provided by Atils for styling the info of what you log.
     */
    constructor(options) {
        this.options = Object.assign({
            date: false,
            ignoreWarning: true,

            titleStyles: [ConsoleStyles.TextColors.Cyan, ConsoleStyles.Styles.Bright],
            messageStyles: [ConsoleStyles.TextColors.Yellow],
            infoStyles: [[ConsoleStyles.TextColors.Magenta, ConsoleStyles.Styles.Dim], [ConsoleStyles.TextColors.White, ConsoleStyles.Styles.Dim]],
        }, options);

        this.lastMessage = undefined;
        this.groupNum = 0;
        this.timerNum = 0;

        if(this.options.ignoreWarning === false) {
            //console.log(`${ConsoleStyles.TextColors.Red}This feature is still unstable.${ConsoleStyles.TextColors.White}\nI am unsure if this feature entirely works as intended. Submit issues on Github.`);
        }
    }

    /**
     * Writes a *message to the console if the first argument (statement) is false. *Changed from throwing an Error Message to a Warning Message.
     * @param {*} statement - The Statement to be checked if it is true.
     * @param {Object|ObjectUtil} info - An Object or ObjectUtil with information you would like to provide.
     */
    assert(statement, info) {
        if(statement === true) return;
        this.warn(`Assertion Failed`, info);
    }

    /**
     * Logs a message to the console. See: [console.log()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/log}
     * @param {string} title - The title of what you would like to log.
     * @param {string} message - The message of what you would like to log.
     * @param {Object|ObjectUtil} [info] - Any information you would like to log.
     */
    log(title, message, info) {
        const msg = [];
        if(!title) return new ConsoleError(`No Title was provided.`); 
        if(!message) return new ConsoleError(`No Message was provided.`);

        if(this.options.titleStyles.length > 0) {
            const styles = [];
            this.options.titleStyles.forEach(style => {
                if(ConsoleStyles.resolve(style)) {
                    styles.push(style);
                }
            });

            msg.push(`${styles.join('')}${title}${ConsoleStyles.Styles.Blank}: `);
        } else msg.push(`${title}: `);

        if(this.options.messageStyles.length > 0) {
            const styles = [];
            this.options.messageStyles.forEach(style => {
                if(ConsoleStyles.resolve(style)) {
                    styles.push(style);
                }
            });

            msg.push(`${styles.join('')}${message}${ConsoleStyles.Styles.Blank} `);
        } else msg.push(`${message}`);

        if(info) {
            if(new ObjectUtil().isObject(info) === false) new ConsoleError(`Provided Information Type was not an Object (or ObjectUtil).`);
            msg.push('Info\n    ');


            if(info instanceof ObjectUtil) {
                info.entries().forEach(entry => {
                    const keyS = [];
                    const valS = [];

                    if(this.options.infoStyles[0] instanceof Array && this.options.infoStyles[0].length > 0) {
                        this.options.infoStyles[0].forEach(v => {
                            if(ConsoleStyles.resolve(v)) {
                                keyS.push(v);
                            }
                        });
                    }

                    if(this.options.infoStyles[1] instanceof Array && this.options.infoStyles[1].length > 0) {
                        this.options.infoStyles[1].forEach(v => {
                            if(ConsoleStyles.resolve(v)) {
                                valS.push(v);
                            }
                        });
                    }

                    msg.push(`${keyS.join('')}${entry[0]}${ConsoleStyles.Styles.Blank}: ${valS.join('')}${entry[1]}${ConsoleStyles.Styles.Blank}`);
                });
            } else {
                Object.entries(info).forEach(entry => {
                    const keyS = [];
                    const valS = [];

                    if(this.options.infoStyles[0] instanceof Array && this.options.infoStyles[0].length > 0) {
                        this.options.infoStyles[0].forEach(v => {
                            if(ConsoleStyles.resolve(v)) {
                                keyS.push(v);
                            }
                        });
                    }

                    if(this.options.infoStyles[1] instanceof Array && this.options.infoStyles[1].length > 0) {
                        this.options.infoStyles[1].forEach(v => {
                            if(ConsoleStyles.resolve(v)) {
                                valS.push(v);
                            }
                        });
                    }

                    msg.push(`${keyS.join('')}${entry[0]}${ConsoleStyles.Styles.Blank}: ${valS.join('')}${entry[1]}${ConsoleStyles.Styles.Blank}\n    `);
                });
            }
        }
        console.log(msg.join(''));
    }

    /**
     * Starts a new counter from the console. See: [console.count()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/count}
     * @param  {...string} [labels] - The names of the Counters you would like to start.
     */
    count(...labels) {
        console.count(labels);
    }

    /**
     * Resets a counter from the console. See: [console.countReset()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/countReset}
     * @param {...string} [labels] - The names of the Counters you would like to reset.
     */
    countReset(...labels) {
        console.countReset(labels);
    }

    /**
     * Creates a new inline group in the Console. See: [console.group()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/group}
     * @param {string} [title] - The title of the Group.
     */
    group(title) {
        const styles = [];
        if(this.options.titleStyles instanceof Array) {
            this.options.titleStyles.forEach(style => {
                if(ConsoleStyles.resolve(style)) {
                    styles.push(style);
                }
            });
        }
        this.groupNum += 1;
        console.group(`${styles.join('')}${title ?? `Console Grouping ${this.groupNum}`}:${ConsoleStyles.Styles.Blank}`);
    }
    
    /**
     * Ends the latest inline group. See: [console.groupEnd()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/groupEnd}
     */
    groupEnd() {
        console.groupEnd();
        this.groupNum -= 1;
    }

    /**
     * Throws a new [Error]{@link ErrorBuilder}. Ignores Styling.
     * @alias exception
     * @param {string} title - The title of the Error.
     * @param {string} message - The message of the Error.
     */
    error(title, message) {
        new ErrorBuilder(title ?? "Error", message ?? "Unable to perform action.");
    }

    exception(title, message) {
        this.error(title, message);
    }

    /**
     * Merges all functions of [console.timer()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/time} and similar methods.
     * @param {string} title - The title of the Timer.
     * @param {string} action - The action you wish to perform (start, stop, log).
     */
    timer(title, action) {
        if(action.toLowerCase() === 'start') {
            const styles = [];
            if(this.options.titleStyles instanceof Array) {
                this.options.titleStyles.forEach(style => {
                    if(ConsoleStyles.resolve(style)) {
                        styles.push(style);
                    }
                });
            }
            this.timerNum += 1;
            console.time(`${styles.join('')}${title ?? `Console Timer ${this.timerNum}`}${ConsoleStyles.Styles.Blank}`);
        } else if(action.toLowerCase() === 'stop') {
            const styles = [];
            if(this.options.titleStyles instanceof Array) {
                this.options.titleStyles.forEach(style => {
                    if(ConsoleStyles.resolve(style)) {
                        styles.push(style);
                    }
                });
            }
            console.timeEnd(`${styles.join('')}${title ?? `Console Timer ${this.timerNum}`}${ConsoleStyles.Styles.Blank}`);
            this.timerNum -= 1;
        } else if(action.toLowerCase() === 'log') {
            console.timeLog(`${styles.join('')}${title ?? `Console Timer ${this.timerNum}`}${ConsoleStyles.Styles.Blank}`);
        }
    }

    /**
     * Logs the Stack Trace.
     */
    trace() {
        console.log(`${ConsoleStyles.TextColors.White}${ConsoleStyles.Styles.Dim}`);
        console.trace();
        console.log(`${ConsoleStyles.Styles.Blank}`);
    }

    /**
     * Sends a warning to the console. Ignores Styling.
     * @param {string} message - The message to be warned about.
     */
    warn(message) {
        console.warn(`${ConsoleStyles.TextColors.Red}Warning${ConsoleStyles.Styles.Blank}: ${ConsoleStyles.Styles.Blink}${message}`);
    }
}

module.exports = { ConsoleUtil };