# eslint-formatter-episerver-cms

Formatters for [`eslint-plugin-episerver-cms`](https://github.com/seriema/eslint-plugin-episerver-cms) that gives a nicer overview of what internal and deprecated Episerver CMS JavaScript API's are used.

![Screenshot of summary output](docs/summary.png)

## Installation

You'll first need to install [ESLint](http://eslint.org) and [eslint-plugin-episerver-cms](https://github.com/seriema/eslint-plugin-episerver-cms):

```
$ npm i eslint eslint-plugin-episerver-cms --save-dev
# or
$ yarn add eslint eslint-plugin-episerver-cms -D
```

Next, install `eslint-formatter-episerver-cms` from github as it's not ready for npm just yet:

```
$ npm i seriema/eslint-formatter-episerver-cms --save-dev
# or
$ yarn add seriema/eslint-formatter-episerver-cms -D
```

**Note:** If you installed ESLint and eslint-plugin-episerver-cms globally (using the `-g` flag) then you must also install `eslint-formatter-episerver-cms` globally.

## Usage

There are several formatters you can use to get a clearer overview of what Episerver API's are being used but shouldn't be. If you want to send us some statistics to help us in the CMS UI team, please send us the CSV version. [See all formatters.](docs/README.md)

The summary formatter can be used with:

```console
$ eslint . --format=episerver-cms
```

### Analyzing multiple projects

Install globally (see instructions above), and then run this for any project:

```
$ eslint C:/YourEpiserverProject/ --output-file YourEpiserverProject.json --plugin episerver-cms --format episerver-cms --rule "{ episerver-cms/no-internal-episerver-apis: error, episerver-cms/no-deprecated-episerver-apis: warn }" --ignore-pattern "node_modules" --ignore-pattern "dtk"
```
