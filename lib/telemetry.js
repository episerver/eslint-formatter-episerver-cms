const resources = require("./tmp/resources");

/* FORMAT (slimmed version of the regular result output, and is not sorted as it only needs to be fast):
    [
        {
            "location": "C:\\SomeProject\\SomeProject.Shopping.Shell\\ClientResources\\epi-ecf-ui\\widget\\CatalogPasteItemDialog.js",
            "modules": [
                {
                    "name": "epi/shell/widget/_ActionProviderWidget",
                    "category": "internal",
                    "ruleId": "@episerver/cms/no-internal-episerver-apis",
                    "line": 13,
                    "column": 5
                },
                {
                    "name": "epi/shell/widget/dialog/_DialogContentMixin",
                    "category": "internal",
                    "ruleId": "@episerver/cms/no-internal-episerver-apis",
                    "line": 14,
                    "column": 5
                }
            ]
        }
    ]
*/

module.exports = function (results) {
    const isEpiMessage = message => message.ruleId && message.ruleId.startsWith(resources.rulePrefix);
    const areEpiMessages = result => result.messages && result.messages.some(isEpiMessage);

    const ruleNameFromMessage = msg => msg.ruleId.replace(resources.rulePrefix, "");
    const moduleNameFromMessage = msg => msg.message
        .replace(/'/g, "")
        .replace(" is an internal Episerver module and can have a breaking change in any release.", "")
        .replace(" is a deprecated Episerver module and will be removed in a future major version.", "");

    const categoryFromMessage = message => resources.rules.shortNames[ruleNameFromMessage(message)];

    const output = results
        .filter(areEpiMessages)
        .map(file => {
            return {
                location: file.filePath,
                modules: file.messages
                    .filter(isEpiMessage)
                    .map(message => {
                        return {
                            name: moduleNameFromMessage(message),
                            category: categoryFromMessage(message),
                            ruleId: message.ruleId,
                            line: message.line,
                            column: message.column
                        };
                    })
            }
        });

    return JSON.stringify(output, null, 4);
};
