module.exports = class Command {
    constructor () {
        this.name = ''
        this.description = ''
        this.defaultPermission = true
    }

    /**
     * Set the command name.
     * @param {String} name
     * @returns {Command}
     */
    setName (name) {
        this.name = name
        return this
    }

    /**
     * Set the command description
     * @param {String} description
     * @returns {Command}
     */
    setDescription (description) {
        this.description = description
        return this
    }

    setDefaultPermission (defaultPermission) {
        this.defaultPermission = defaultPermission
        return this
    }

    /**
     * Run the command supplying a valid interaction
     * @param {Interaction} interaction The interaction from the application
     * @returns {Boolean} The success of the action
     * @abstract
     */
    run (interaction) {}
}
