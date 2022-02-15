const Command = require('../src/commands/Command')

class PingCommand extends Command {
    constructor () {
        super()

        this.setName('ping')
            .setDescription('Return the time it takes to contact the Discord API')
            .setDefaultPermission(false)
    }

    async run (interaction) {
        const startTick = new Date().getTime()

        await interaction.deferReply({ ephemeral: true })
        interaction.editReply({ content: `Pong! Command response time is **${new Date().getTime() - startTick}**ms` })
    }
}

module.exports = PingCommand
