const Command = require('../src/commands/Command')
const { Translate } = require('../src/i18n/i18n')

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

        interaction.editReply({
            content: Translate(interaction.locale, 'command.ping.message')
                        .replace('%s', new Date().getTime() - startTick) // Make the MS text
        })
    }
}

module.exports = PingCommand
