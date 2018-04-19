const lintResults = require("./linted.json");
const fs = require("fs");

const trimSource = source => source.trim().replace(/"/g, "").replace(/,/, "");
const moduleNameFromMessage = message => message
    .replace(/'/g, "")
    .replace(" is an internal Episerver module and can have a breaking change in any release.", "")
    .replace(" is a deprecated Episerver module and will be removed in a future major version.", "");

const violations = lintResults
    .filter(violation => violation.messages.length);
const internalMessages = violations
    .map(violation => {
        return violation.messages.map(message => {
            return {
                message: moduleNameFromMessage(message.message),
                ruleId: message.ruleId
            };
        });
    });

const epiRulePlugin = "episerver-cms/";
const isEpiRule = ruleId => ruleId.startsWith(epiRulePlugin)
const ruleName = ruleId => ruleId.replace(epiRulePlugin, "");

let episerverCmsViolations = {};
violations.forEach(violation => {
    violation.messages
        .filter(message => isEpiRule(message.ruleId))
        .forEach(message => {
            const rule = ruleName(message.ruleId);
            const module = moduleNameFromMessage(message.message);

            // If this is the first time logging this particular rule violation, create a map for us to store the summary.
            if (!episerverCmsViolations[rule]) {
                episerverCmsViolations[rule] = {};
            }

            // If this is the first time logging this module name, create a counter.
            if (!episerverCmsViolations[rule][module]) {
                episerverCmsViolations[rule][module] = {
                    name: module,
                    count: 0
                };
            }

            // Bump the counter for the usages of this module.
            episerverCmsViolations[rule][module].count++;
        });
});

// Sort, to get a consistent output.
let sortedViolations = {};
const ruleKeys = Object.keys(episerverCmsViolations);
ruleKeys.sort();
ruleKeys.forEach(ruleKey => {
    const modules = episerverCmsViolations[ruleKey];
    moduleArray = [];

    Object.keys(modules).forEach(moduleKey => {
        const module = modules[moduleKey];

        let flatModuleInfo = {};
        flatModuleInfo[module.name] = module.count;
        moduleArray.push(flatModuleInfo);
    });

    moduleArray
        .sort((moduleA, moduleB) => {
            const aKey = Object.keys(moduleA)[0].toLocaleLowerCase();
            const bKey = Object.keys(moduleB)[0].toLocaleLowerCase();

            return aKey.localeCompare(bKey);
        })
        .sort((moduleA, moduleB) => {
            const aKey = Object.keys(moduleA)[0];
            const bKey = Object.keys(moduleB)[0];

            return moduleB[bKey] - moduleA[aKey];
        });

    sortedViolations[ruleKey] = {};
    moduleArray.forEach(module => {
        const name = Object.keys(module)[0];
        const count = module[name];

        sortedViolations[ruleKey][name] = count;
    });
});

/*
It should look like this:
{
    "no-deprecated-episerver-apis": [
        "epi/shell/widget/_ActionProviderWidget": 3,
        "epi-cms/store/CustomQueryEngine": 2,
        ...
    ],
    "no-internal-episerver-apis": [
        "epi/shell/widget/dialog/_DialogContentMixin": 5
    ]
}
*/

const writeJson = (filename, object) => {
    fs.writeFileSync(filename, JSON.stringify(object, null, 4), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log(`The file ${filename} was saved!`);
    });
};

console.log(JSON.stringify(sortedViolations, null, 4));
writeJson("epi-module-usage.json", sortedViolations);