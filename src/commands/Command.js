/**
 * The base-plate for implementing commands.
 * @abstract
 */
class Command {
    constructor () {
        /**
         * The name/identifier of the command.
         * @type {String}
         */
        this.name = ''

        /**
         * The written description of the command.
         * @type {String}
         */
        this.description = ''

        /**
         * The default access-level of the command.
         * @type {Boolean}
         */
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

    /**
     * Set the default access level.
     * @param {Boolean} defaultPermission true/false can access by default
     * @returns {Command}
     */
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

module.exports = Command
