const Command = require('../src/commands/Command')

class PingCommand extends Command {
    constructor () {
        super()

        this.setName('ping')
            .setDescription('Return the time it takes to contact the Discord API')
            .setDefaultPermission(false)
    }

    run (interaction) {
        interaction.reply({ content: 'Pong!', ephemeral: true })
    }
}

module.exports = PingCommand
