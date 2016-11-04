const pkg = require("../package.json");

function parseVerison(verStr) {
    return parseFloat(verStr.replace(/[^\d\.]/g, ''));
}

module.exports = (options) => {
    return new Promise((res, rej) => {
        const minNodeVer = parseVerison(pkg.engines.node);
        const currentNodeVer = parseVerison(process.version);

        if (minNodeVer < currentNodeVer) {
            rej("Your nodejs version is lower then required. Upgrade to >=" + minNodeVer + ".x to use pomjs-cli");
        }

        res();
    });
}
