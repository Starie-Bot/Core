const Phrase = require('../Phrase')

module.exports = class DefaultPhrase extends Phrase {
    constructor (core) {
        super(core, { text: 'Test message!' })
    }
}
