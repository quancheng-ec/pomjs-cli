'use strict';

const chalk = require("chalk");
const format = require("util").format;
const sep = chalk.grey("·");

class Logger {
    constructor(prefix) {
        this.prefix = prefix
    }

    fatal(error) {
        if (error instanceof Error)
            error = error.message.trim();
        const message = format.apply(format, arguments);
        console.error(chalk.red(this.prefix), sep, message)
        process.exit(1);
    }

    success() {
        const message = format.apply(format, arguments);
        console.log(chalk.yellow(this.prefix), sep, message)
    }
}

module.exports = (prefix) => {
    return new Logger(prefix || "logger")
}
