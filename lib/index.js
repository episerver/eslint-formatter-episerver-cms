const defaultFormatter = require("./summary");

// Currently only exporting one formatter, the default one: summary.
module.exports = function (results) {
    return defaultFormatter(results);
}
