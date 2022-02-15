const Phrase = require('../Phrase')

module.exports = class Default2Phrase extends Phrase {
    constructor (core) {
        super(core, { text: 'Test message 2-!' })
    }
}
