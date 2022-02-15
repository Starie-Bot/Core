const { Routes } = require('discord-api-types/v9')
const path = require('node:path')
const { ID } = require(path.resolve('./', 'config', 'config.json'))

/**
 * Post the commands currently registered to the Discord API
*/
module.exports.Post = (rest, commands) => {
    rest.put(
        Routes.applicationGuildCommands(ID, '606926504424767488'),
        { body: commands }
    )
}
