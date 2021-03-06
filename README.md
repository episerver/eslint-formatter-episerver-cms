# @episerver/eslint-formatter-cms

Formatters for [`@episerver/eslint-plugin-cms`](https://github.com/seriema/eslint-plugin-episerver-cms) that gives a nicer overview of what internal and deprecated Episerver CMS JavaScript API's are used.

> _If you work on multiple Episerver projects and want to help us improve our public API, [we could use your help](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/say-hello.md)._

![Screenshot of summary output](https://github.com/seriema/eslint-formatter-episerver-cms/blob/master/docs/summary.png?raw=true)

## Installation

You'll first need to install [ESLint](http://eslint.org) and [@episerver/eslint-plugin-cms](https://github.com/seriema/eslint-plugin-episerver-cms):

```shell
$ npm i eslint @episerver/eslint-plugin-cms --save-dev
# or
$ yarn add eslint @episerver/eslint-plugin-cms -D
```

Next, install `@episerver/eslint-formatter-cms`:

```shell
$ npm i @episerver/eslint-formatter-cms --save-dev
# or
$ yarn add @episerver/eslint-formatter-cms -D
```

**Note:** If you installed ESLint and @episerver/eslint-plugin-cms globally (using the `-g` flag) then you must also install `@episerver/eslint-formatter-cms` globally.

## Usage

There are several formatters you can use to get a clearer overview of what Episerver API's are being used but shouldn't be. If you want to send us some statistics to help us in the CMS UI team, please send us the default (telemetry JSON) file. [Read more.](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/say-hello.md)

The telemetry formatter can be used with:

```shell
$ eslint . --format=@episerver/cms
```

### Analyzing multiple projects

Install globally (see instructions above), and then run this for any project:

```shell
$ eslint C:/YourEpiserverProject/ --output-file YourEpiserverProject.json --plugin @episerver/cms --format @episerver/cms --rule "{ @episerver/cms/no-internal-episerver-apis: error, @episerver/cms/no-deprecated-episerver-apis: warn }" --ignore-pattern "node_modules" --ignore-pattern "dtk"
```
