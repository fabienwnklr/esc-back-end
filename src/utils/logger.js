const data = {

    icon: {
        info: '\u2139',
        warn: '\u26A0',
        err: '✘'
    },

    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m"
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};

console.old_info = console.info;
console.info = function() {
 console.old_info(data.bg.Blue + data.fg.White, data.icon.info, data.Reset, data.fg.Blue, ...arguments, data.Reset);
};

console.old_warn = console.warn;
console.warn = function() {
    console.old_warn(data.bg.Yellow + data.fg.Black, data.icon.warn, data.Reset, data.fg.Yellow, ...arguments, data.Reset);
};

console.old_error = console.error;
console.error = function() {
    console.old_error(data.bg.Red + data.fg.White, data.icon.err, data.Reset, data.fg.Red, ...arguments, data.Reset);
};

module.exports = console.info ;
module.exports = console.warn ;
module.exports = console.error ;