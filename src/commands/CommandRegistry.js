const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { readdirSync } = require('node:fs')
const path = require('node:path')
const { Log } = require('../console/Console')

const { TOKEN } = require(path.resolve('./', 'config', 'config.json'))

module.exports = class CommandRegistry {
    constructor (core) {
        /**
         * A reference to the bot core.
         * @type {require('../core/Core')}
        */
        this.core = core

        /**
         * @returns {Map[String, require('./Command']}
         */
        this.commands = new Map()
        // Todo;

        this.rest = new REST({ version: '9' }).setToken(TOKEN)

        // Register commands from the command directory.
        for (const commandName of readdirSync(path.resolve('./', 'commands'))) {
            const CommandRef = require(path.resolve('./', 'commands', commandName))

            this.Register(new CommandRef())
        }

        this.PostCommands()

        Log(`Command Initalization Time: ${new Date().getTime() - core.startTick}ms`)

        this.onCommand = this.onCommand.bind(this)
    }

    /**
     * Post the commands currently registered to the Discord API
     */
    PostCommands () {
        this.rest.put(
            Routes.applicationGuildCommands('369490199589158912', '606926504424767488'),
            { body: Array.from(this.commands.values()) }
        )
    }

    /**
     * Register a command into the command handler.
     * @param {Command} command The command to register
     */
    Register (command) {
        this.commands.set(command.name, command)
        Log(`Registered ${command.name}`)
    }

    onCommand (interaction) {
        if (!interaction.isCommand) return

        this.commands.get(interaction.commandName).run(interaction)
        console.log('Command recieved')
    }
}
