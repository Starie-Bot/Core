const { Client, Intents } = require('discord.js')
const { TOKEN } = require('../../config/config.json')

module.exports = class Core {
    constructor () {
        console.log('Init')
        /**
         * A local reference to the Discord client.
         * @type {Client}
         * @private
         */
        this.client = new Client({ intents: Intents.FLAGS.GUILDS })
        this.client.once('ready', this.onReady.bind(this))

        this.login() // Log into Discord
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
        console.log('Client ready!')

        // Run a task on each guild in the guild-list after initalization.
        this.getClient().guilds.cache.forEach(
            (guild) => this.onGuildInitalize(guild))
    }

    onGuildInitalize () {
        // TODO; For every guild on initalize.
    }
}
