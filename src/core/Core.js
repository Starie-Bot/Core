const { Client, Intents } = require('discord.js')
const { existsSync, mkdirSync } = require('node:fs')
const CommandRegistry = require('../commands/CommandRegistry')
const { GetConfigPath, CopyDefaultConfig } = require('../config/Config')
const { PrintElapsed } = require('../debug/Debug')

const { TOKEN } = require(GetConfigPath())

const coreDirectories = ['config', 'commands', 'logs']

module.exports = class Core {
    constructor () {
        this.initalizeCore() // Initalize the default features

        /**
         * The tick of which the bot was powered on.
         * @type {Number}
         */
        this.startTick = new Date().getTime()

        /**
         * A local reference to the Discord client.
         * @type {Client}
         * @private
         */
        this.client = new Client({ intents: Intents.FLAGS.GUILDS })
        this.client.once('ready', this.onReady.bind(this))

        this.login() // Log into Discord

        /**
         * The command registry.
         * @type {CommandRegistry}
         */
        this.registry = new CommandRegistry(this) // Setup the command handler.
        this.client.on('interactionCreate', this.registry.onCommand.bind(this.registry)) // Setup the event for handling fired events
    }

    /**
     * Initalize the core systems such as configuration
     */
    initalizeCore () {
        // Make core directories.
        coreDirectories.forEach((directory) => {
            if (!existsSync(directory)) mkdirSync(directory)
        })

        CopyDefaultConfig()
    }

    /**
     * Return a get-only reference to the client.
     * @type {Client}
     * @returns {Client} The in-use Discord client.
     */
    getClient () {
        return this.client
    }

    /**
     * Run a log-in process on the client.
     */
    login () {
        this.client.login(TOKEN)
    }

    onReady () {
        PrintElapsed(this, 'Initalization time: %sms')

        this.getClient().guilds.cache.forEach( // Run a task on each guild in the guild-list after initalization.
            (guild) => this.onGuildInitalize(guild))
    }

    onGuildInitalize () {
        // TODO; For every guild on initalize.
    }
}
