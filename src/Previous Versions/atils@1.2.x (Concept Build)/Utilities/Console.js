const { ErrorClient } = require('../atils/ErrorClient.js');
const { ErrorBuilder } = require('./Error.js');
const { ConsoleStyles } = require('../Enums/ConsoleStyles.js');
const { Enum } = require('./Enum.js');

const Styles = ConsoleStyles.resolve('textStyle');
const Colors = ConsoleStyles.resolve('textColor');
const BGColors = ConsoleStyles.resolve('backgroundColor');

const reset = Styles.reset;

/**
 * @class
 * @description - An advanced modification to JavaScript's standard console.
 */
class Console {
    /**
     * @description - Constructor method for the Console.
     * @param {Object} [options] - The options for the Console.
     *   @param {Object} [options.styles] - The styling options for the Console.
     *     @param {Array} [options.styles.title] - The styling options for any title in the Console.
     *     @param {Array} [options.styles.message] - The styling options for any message in the Console.
     *     @param {Array} [options.stiles.info] - The styling options for any information in the Console.
     */
    constructor(options) {
        this.options = Object.assign({
            styles: {
                title: [Styles.bright, Styles.underscore, Colors.cyan],
                message: [Styles.dim, Colors.white],
                info: [Styles.dim, Colors.green],
            }
        }, options);

        this.lastMessage = undefined;
        this.groupNum = 0;
        this.timerNum = 0;
    }

    /**
     * Sends a *warning to the Console if the first argument (statement) is false. *JavaScript would throw an Error Message; this is only a Warning.
     * @param {*} statement - The statement to determine the outcome.
     * @param {*} info - Any information you would like to provide.
     */
    assert(statement, info) {
        if(statement === true) return;
        else this.warn(`Assertion Failed`, info);
    }

    /**
     * Logs a message to the console. See: [console.log()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/log}
     * @param {...string} message - The message to be logged to the Console.
     */
    log(...message) {
        const styles = this.options.styles.message.join('') ?? '';
        console.log(`${styles}${message.join(' ')}${reset}`);
    }

    /**
     * Records a message to the console. Advanced Version of: [Console#log()]{@link Console.log}
     * @param {string} title - The title of what will be recorded.
     * @param {string} message - The message of what will be recorded.
     * @param {*} info - Any additional information.
     */
    record(title, message, info) {
        const msg = [];
        if(!title) ErrorClient.throw('ConsoleError');
        if(!message) ErrorClient.throw('ConsoleError');

        if(this.options.styles.title.length > 0) {
            const styles = [];
            this.options.styles.title.forEach(style => {
                let invalid = true;
                Object.values(Styles).map(sty => {
                    if(sty === style) invalid = false;
                });

                if(invalid === true) {
                    Object.values(Colors).map(sty => {
                        if(sty === style) invalid = false;
                    });

                    if(invalid === true) {
                        Object.values(BGColors).map(sty => {
                            if(sty === style) invalid = false;
                        });
                    }
                }

                if(invalid === false) {
                    styles.push(style);
                }
            });

            msg.push(styles.join(''));
        }

        msg.push(`${title}${reset}: `);

        if(this.options.styles.message.length > 0) {
            const styles = [];
            this.options.styles.message.forEach(style => {
                let invalid = true;
                Object.values(Styles).map(sty => {
                    if(sty === style) invalid = false;
                });

                if(invalid === true) {
                    Object.values(Colors).map(sty => {
                        if(sty === style) invalid = false;
                    });

                    if(invalid === true) {
                        Object.values(BGColors).map(sty => {
                            if(sty === style) invalid = false;
                        });
                    }
                }

                if(invalid === false) {
                    styles.push(style);
                }
            });

            msg.push(styles.join(''));
        }

        msg.push(`${message}${reset}`);

        if(info) {
            let infoStyles;
            if(this.options.styles.info.length > 0) {
                const styles = [];
                this.options.styles.info.forEach(style => {
                    let invalid = true;
                    Object.values(Styles).map(sty => {
                        if(sty === style) invalid = false;
                    });
    
                    if(invalid === true) {
                        Object.values(Colors).map(sty => {
                            if(sty === style) invalid = false;
                        });
    
                        if(invalid === true) {
                            Object.values(BGColors).map(sty => {
                                if(sty === style) invalid = false;
                            });
                        }
                    }
    
                    if(invalid === false) {
                        styles.push(style);
                    }
                });
    
                infoStyles = styles
            }

            if(typeof info === "object" && !Array.isArray(info) && info !== null) {
                if(info instanceof Enum) {
                    msg.push('\nProvided Data:\n');
                    const values = info.resolve('atils*get-all-values');
                    const built = messageBuilder(values, infoStyles, 1);
                    msg.push(built);
                } else {
                    msg.push('\nProvided Data:\n');
                    const builtFromInfo = messageBuilder(info, infoStyles, 1);
                    msg.push(builtFromInfo);
                }
            } else if(Array.isArray(info)) {
                msg.push('\nProvided Data:\n  ');
                msg.push(infoStyles.join(''));
                msg.push(info.join(`${reset},${infoStyles.join('')} `));
            } else if(typeof info === "string" || typeof info === "boolean" || typeof info === "number" || typeof info === "bigint") {
                msg.push('\nProvided Data:\n  ');
                msg.push(infoStyles.join(''));
                msg.push(info);
            }
        }

        msg.push(reset);
        console.log(msg.join(''));
    }

    /**
     * Starts a new Counter for the console. See: [console.count()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/count}
     * @param  {...string} labels - The names of the Counters you would like to start.
     */
    count(...labels) {
        console.count(...labels);
    }

    /**
     * Resets a Counter from the console. See: [console.countReset()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/countReset}
     * @param  {...string} labels - The names of the Counters you would like to reset.
     */
    countReset(...labels) {
        console.countReset(...labels);
    }

    /**
     * Creates an inline group in the console. See: [console.group()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/group}
     * @param {string} [title] - The title of the group.
     */
    group(title) {
        let styles = [];
        if(this.options.styles.title.length > 0) {
            this.options.styles.title.forEach(style => {
                let invalid = true;
                Object.values(Styles).map(sty => {
                    if(sty === style) invalid = false;
                });
    
                if(invalid === true) {
                    Object.values(Colors).map(sty => {
                        if(sty === style) invalid = false;
                    });
    
                    if(invalid === true) {
                        Object.values(BGColors).map(sty => {
                            if(sty === style) invalid = false;
                        });
                    }
                }
    
                if(invalid === false) {
                    styles.push(style);
                }
            });

            styles = styles.join('');
        }

        console.group(`${styles}${title ?? `Console Grouping ${this.groupNum}:${reset}`}`);
    }

    /**
     * Ends the latest inline group. See: [console.groupEnd]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/groupEnd}
     */
    groupEnd() {
        console.groupEnd();
        this.groupNum -= 1;
    }

    /**
     * Throws a new [Error]{@link ErrorBuilder}. Can also be referred to as [Console#exception()]{@link Console.exception}
     * @param {string} title - The title of the Error.
     * @param {string} message - The message of the Error.
     */
    error(title, message) {
        new ErrorBuilder(title ?? 'Error', message ?? 'Unable to perform action.');
    }

    /**
     * Throws a new [Error]{@link ErrorBuilder}. Can also be referred to as [Console#error()]{@link Console.error}
     * @param {string} title - The title of the Error.
     * @param {string} message - The message of the Error.
     */
    exception(title, message) {
        this.error(title, message);
    }

    /**
     * Merges all similar methods to [console.timer()]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/timer}.
     * @param {string} title - The title of the timer.
     * @param {string} action - The action you wish to perform (start, stop, log).
     */
    timer(title, action) {
        const styles = [];
        if(this.options.styles.title.length > 0) {
            this.options.styles.title.forEach(style => {
                let invalid = true;
                Object.values(Styles).map(sty => {
                    if(sty === style) invalid = false;
                });
    
                if(invalid === true) {
                    Object.values(Colors).map(sty => {
                        if(sty === style) invalid = false;
                    });
    
                    if(invalid === true) {
                        Object.values(BGColors).map(sty => {
                            if(sty === style) invalid = false;
                        });
                    }
                }
    
                if(invalid === false) {
                    styles.push(style);
                }
            });

            styles = styles.join('');
        } else styles = '';

        if(action.toLowerCase() === 'start') {
            this.timerNum += 1;
            console.time(`${styles}${title ?? `Console Timer ${this.timerNum}`}${reset}`);
        } else if(action.toLowerCase() === 'stop') {
            this.timerNum -= 1;
            console.timeEnd(`${styles}${title ?? `Console Timer ${this.timerNum}`}${reset}`);
        } else if(action.toLowerCase() === 'log') {
            console.timeLog(`${styles}${title ?? `Console Timer ${this.timerNum}`}${reset}`);
        }
    }

    /**
     * Logs the Stack Trace to the console.
     */
    trace() {
        console.log(reset, Styles.dim);
        console.trace();
        console.log(reset);
    }

    /**
     * Sends a warning message to the console. Ignores Styling.
     * @param {string} message - The message to be referred to in the warning.
     */
    warn(message) {
        console.warn(`${Colors.red}${Colors.bright}WARNING${reset}: ${Styles.blink}${message ?? "Something happened."}`);
    }
}

function readKeys(object, styles) {
    const keys = [styles];
    Object.keys(object).forEach(key => {
        keys.push(key);
    });

    return keys;
}

function readValues(object) {
    const values = [];
    Object.values(object).forEach(value => {
        values.push(value);
    });

    return values;
}

function messageBuilder(object, styles, tabs) {
    let tab = tabs;
    if(!tab) tab = 0;
    let keys = readKeys(object, styles);
    let values = readValues(object);

    keys = [...keys.join(`||ATILSBARRIER||${styles.join('')}`).split('||ATILSBARRIER||')].slice(1);

    let toTabs = [];
    const message = [];
    for(let i = 0; i < tab; i++) {
        toTabs.push('    ');
    }
    toTabs = toTabs.join('')

    keys.forEach(k => {
        let key = k;
        if(typeof values[keys.indexOf(key)] === 'object' && !Array.isArray(values[keys.indexOf(key)]) && typeof values[keys.indexOf(key)] !== 'function' && !/^\s*class\s+/.test(values[keys.indexOf(key)].toString())) {
            if(values[keys.indexOf(key)] instanceof Enum) {
                const enumVals = values[keys.indexOf(key)].resolve('atils*get-all-values')
                message.push(`${toTabs}${key}${reset}: {\n${messageBuilder(enumVals, styles, tab + 1)}${toTabs}}\n`);

            } else {
                message.push(`${toTabs}${key}${reset}: {\n${messageBuilder(values[keys.indexOf(key)], styles, tab + 1)}${toTabs}}\n`);
            }
        } else if(Array.isArray(values[keys.indexOf(key)])) {
            console.log(values[keys.indexOf(key)]);
            message.push(`${toTabs}${key}${reset}: [ ${values[keys.indexOf(key)].join(`${styles.join},${reset} `)} ]\n`)

        } else if(typeof values[keys.indexOf(key)] === "string" || typeof values[keys.indexOf(key)] === "boolean" || typeof values[keys.indexOf(key)] === "number" || typeof values[keys.indexOf(key)] === "bigint") {
            message.push(`${toTabs}${key}${reset}: ${values[keys.indexOf(key)]}\n`)
        } else return;
    });

    return message.join('');
}

module.exports = { Console };