const { existsSync } = require('node:fs')
const path = require('node:path')
const i18nDirectory = path.resolve('lang')

module.exports.Translate = (locale, key) => {
    const i18n = existsSync(path.resolve(i18nDirectory, `${locale}.json`))
    ? require(path.resolve(i18nDirectory, `${locale}.json`))
    : require(path.resolve(i18nDirectory, 'en.json'))

    return i18n[key] || key
}
