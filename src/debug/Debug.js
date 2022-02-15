const { Log } = require('../console/Console')

/**
 * Display a message with an attached elapsed time.
 * @param {require('../core/Core')} core
 * @param {String} message
 */
module.exports.PrintElapsed = (core, message) => {
    Log(message.replaceAll('%s', new Date().getTime() - core.startTick))
}
