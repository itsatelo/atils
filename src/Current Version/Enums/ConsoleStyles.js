const Enum = require('../Utilities/Enum.js');

// Mess with these in the future; goal: lower the count of the textStyle resolver
// ConsoleStyles.textStyle.bright raises the brightness of the color, I haven't messed with the others.

/**
 * @example
 * textStyle {
 *   bright, dim, underscore, blink, reverse, invisible, default, bold_white
 * }
 * 
 * textColor {
 *   black, red, yellow, blue, magenta, cyan, white, gray, light_red, light_green, light_yellow, light_blue, light_magenta, light_cyan, light_white, default
 * }
 * 
 * backgroundColor {
 *   black, red, yellow, blue, magenta, cyan, white, gray, light_red, light_green, light_yellow, light_blue, light_magenta, light_cyan, light_white, default
 * }
 */
const ConsoleStyles = new Enum({
    all: {
        default: '\x1b[0m',
        reset: '\x1b[0m',
    },

    textStyle: {
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        underscore: '\x1b[4m',
        blink: '\x1b[5m',
        reverse: '\x1b[7m',
        invisible: '\x1b[8m',

        dark: '\x1b[2m',
        hidden: '\x1b[8m',
        light: '\x1b[1m',

        default: '\x1b[0m',
        reset: '\x1b[0m',

        bold_white: '\x1b[1m\x1b[37m'
    },

    textColor: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',

        purple: '\x1b[35m',

        default: '\x1b[37m',
        reset: '\x1b[37m',
        invisible: '\x1b[8m',

        gray: '\x1b[1m\x1b[30m',
        light_red: '\x1b[1m\x1b[31m',
        light_green: '\x1b[1m\x1b[32m',
        light_yellow: '\x1b[1m\x1b[33m',
        light_blue: '\x1b[1m\x1b[34m',
        light_magenta: '\x1b[1m\x1b[35m',
        light_cyan: '\x1b[1m\x1b[36m',
        light_white: '\x1b[1m\x1b[37m',

        light_purple: '\x1b[1m\x1b[35m',
    },

    backgroundColor: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',

        purple: '\x1b[45m',

        default: '\x1b[47m',
        reset: '\x1b[47m',

        light_red: '\x1b[1m\x1b[41m',
        light_green: '\x1b[1m\x1b[42m',
        light_yellow: '\x1b[1m\x1b[43m',
        light_blue: '\x1b[1m\x1b[44m',
        light_magenta: '\x1b[1m\x1b[45m',
        light_cyan: '\x1b[1m\x1b[46m',
        light_white: '\x1b[1m\x1b[47m',

        light_purple: '\x1b[1m\x1b[45m',
    }
});

/**
 * Resolves and returns provided Text Style.
 * @param {string} style - The Text Style to be resolved. 
 * @returns {string} - Console Text Style.
 */
function Style(style) {
    return ConsoleStyles.resolveTextStyle(style.replace(' ', '_'));
}

/**
 * Resolves and returns provided Text Color.
 * @param {string} color - The Text Color to be resolved. 
 * @returns {string} - Console Text Color.
 */
function Color(color) {
    return ConsoleStyles.resolveTextColor(color.replace(' ', '_'));
}

/**
 * Resolves and returns provided Background Color
 * @param {string} color - The Background Color to be resolved. 
 * @returns {string} - Console Background Color.
 */
function BackgroundColor(color) {
    return ConsoleStyles.resolveBackgroundColor(color.replace(' ', '_'));
}

module.exports = { ConsoleStyles, Style, Color, BackgroundColor };