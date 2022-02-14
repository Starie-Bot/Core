const { Client, Intents } = require('discord.js')
const { TOKEN } = require('../../config/config.json')
const { Log } = require('../console/Console')
const { existsSync, mkdirSync, copyFileSync } = require('node:fs')
const path = require('node:path')
const CommandRegistry = require('../commands/CommandRegistry')

const coreDirectories = ['config', 'commands']

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
        this.client.on('interactionCreate', this.registry.onCommand) // Setup the event for handling fired events
    }

    /**
     * Initalize the core systems such as configuration
     */
    initalizeCore () {
        // Make core directories.
        coreDirectories.forEach((directory) => {
            if (existsSync(directory)) return
            mkdirSync(directory)
        })

        // Copy default config if not existant.
        if (!existsSync(path.resolve('config', 'config.json'))) {
            copyFileSync(
                path.resolve('config', 'config.default.json'),
                path.resolve('config', 'config.json')
            )
        }
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
        // TODO; Implement
        Log('Client ready!')
        Log(`Initalization time: ${new Date().getTime() - this.startTick}ms`)

        // Run a task on each guild in the guild-list after initalization.
        this.getClient().guilds.cache.forEach(
            (guild) => this.onGuildInitalize(guild))
    }

    onGuildInitalize () {
        // TODO; For every guild on initalize.
    }
}
