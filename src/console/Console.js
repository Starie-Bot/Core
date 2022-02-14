const chalk = require('chalk')

module.exports.Log = (message) => {
    console.log(chalk.white(message))
}

module.exports.Warning = (message) => {
    console.log(chalk.yellow(`[Warning] ${message}`))
}

module.exports.Error = (message) => {
    console.log(chalk.red(`[Error] ${message}`))
}
