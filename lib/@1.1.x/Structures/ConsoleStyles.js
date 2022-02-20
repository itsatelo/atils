const ConsoleStyles = {
    Styles: {
        Blank: '\x1b[0m',
        Bright: '\x1b[1m',
        Dim: '\x1b[2m',
        Underscore: '\x1b[4m',
        Blink: '\x1b[5m',
        Reverse: '\x1b[7m',
        Hidden: '\x1b[8m',
    },

    TextColors: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
    },

    BackgroundColors: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
    },
};

ConsoleStyles.resolve = async(item) => {
    if(ConsoleStyles.all.includes(item)) return true;
    return false;
},

ConsoleStyles.all = [
    ConsoleStyles.Styles.Blank,
    ConsoleStyles.Styles.Bright,
    ConsoleStyles.Styles.Dim,
    ConsoleStyles.Styles.Underscore,
    ConsoleStyles.Styles.Blink,
    ConsoleStyles.Styles.Reverse,
    ConsoleStyles.Styles.Hidden,
    ConsoleStyles.TextColors.Black,
    ConsoleStyles.TextColors.Red,
    ConsoleStyles.TextColors.Green,
    ConsoleStyles.TextColors.Yellow,
    ConsoleStyles.TextColors.Blue,
    ConsoleStyles.TextColors.Magenta,
    ConsoleStyles.TextColors.Cyan,
    ConsoleStyles.TextColors.White,
    ConsoleStyles.BackgroundColors.Black,
    ConsoleStyles.BackgroundColors.Red,
    ConsoleStyles.BackgroundColors.Green,
    ConsoleStyles.BackgroundColors.Yellow,
    ConsoleStyles.BackgroundColors.Blue,
    ConsoleStyles.BackgroundColors.Magenta,
    ConsoleStyles.BackgroundColors.Cyan,
    ConsoleStyles.BackgroundColors.White,
]

module.exports = {
    ConsoleStyles: Object.freeze(ConsoleStyles),
}