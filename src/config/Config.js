const { existsSync, copyFileSync } = require('node:fs')
const path = require('node:path')
const configPath = path.resolve('config', 'config.json')

module.exports.GetConfigPath = () => {
    return configPath
}

module.exports.CopyDefaultConfig = () => {
    // Copy default config if not existant.
    if (!existsSync(this.GetConfigPath())) {
        copyFileSync(
            path.resolve('config', 'config.default.json'),
            this.GetConfigPath()
        )
    }
}

module.exports.ReadConfig = () => {
    return require(configPath)
}
