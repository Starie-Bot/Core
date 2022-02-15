const chalk = require('chalk')
const { appendFileSync, writeFileSync, existsSync } = require('node:fs')
const path = require('node:path')

const latestLog = path.resolve('logs', 'latest.log')

if (existsSync(latestLog)) writeFileSync(latestLog, '')

module.exports.Log = (message) => {
    console.log(chalk.white(message))
    appendFileSync(latestLog, `[${new Date().toTimeString()}] [LOG] ${message}\n`)
}

module.exports.Warning = (message) => {
    console.log(chalk.yellow(`[Warning] ${message}`))
    appendFileSync(latestLog, `[${new Date().toTimeString()}] [WARNING] ${message}\n`)
}

module.exports.Error = (message) => {
    console.log(chalk.red(`[Error] ${message}`))
    writeFileSync(path.resolve('logs', 'error.log'), String(message))
}
