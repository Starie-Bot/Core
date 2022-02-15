const { REST } = require('@discordjs/rest')
const { readdirSync } = require('node:fs')
const path = require('node:path')
const { Log } = require('../console/Console')
const { PrintElapsed } = require('../debug/Debug')
const { Post } = require('../rest/CommandREST')

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
        this.rest = new REST({ version: '9' }).setToken(TOKEN)

        this.getCommands().forEach(this.Register.bind(this)) // Register commands from the command directory.
        Post(this.rest, Array.from(this.commands))

        PrintElapsed(this.core, 'Command Initalization Time: %sms')
    }

    /**
     * Get a list of directory-based commands.
     * @returns {Command[]}
     */
    getCommands () {
        return readdirSync(path.resolve('./', 'commands'))
            .map(cmd => require(path.resolve('./', 'commands', cmd))) // Parse directory
            .map(Command => new Command()) // Construct the commands.
    }

    /**
     * Register a command into the command handler.
     * @param {Command} command The command to register
     * @event onCommandRegister
     */
    Register (command) {
        this.commands.set(command.name, command)
        this.onCommandRegister(command)
    }

    /**
     * Fired upon command registration
     * @param {Command} command
     */
    onCommandRegister (command) {
        Log(`Registered ${command.name}`)
    }

    /**
     * Fired upon a command being used.
     * @param {Interaction} interaction
     * @returns
     */
    onCommand (interaction) {
        if (!interaction.isCommand) return

        this.commands.get(interaction.commandName).run(interaction)
        Log(`Command: ${interaction.commandName}`)
    }
}
