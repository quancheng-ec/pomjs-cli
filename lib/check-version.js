const pkg = require('../package.json')
const request = require('request')
const semver = require('semver')
const chalk = require('chalk')

function parseVerison(verStr) {
  return parseFloat(verStr.replace(/[^\d.]/g, ''))
}

module.exports = options => {
  return new Promise((resolve, reject) => {
    const minNodeVer = parseVerison(pkg.engines.node)
    const currentNodeVer = parseVerison(process.version)

    if (minNodeVer > currentNodeVer) {
      reject('Your nodejs version is lower then required. Upgrade to >=' + minNodeVer + '.x to use pomjs-cli')
    }

    request({
      url: 'https://registry.npmjs.org/pomjs-cli'
    }, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return reject(err)
      }
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = pkg.version

      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of pomjs-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
        return reject()
      }

      resolve()
    })
  })
}
