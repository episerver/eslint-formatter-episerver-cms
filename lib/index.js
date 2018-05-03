const defaultFormatter = require("./telemetry");

// Currently only exporting one formatter, the default one: telemetry.
module.exports = function (results) {
    return defaultFormatter(results);
}
