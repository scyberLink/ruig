# ruigem

> _The Ruig Extension Manager_

[![Build Status](https://dev.azure.com/monacotools/Monaco/_apis/build/status/npm/microsoft.ruig-ruigem?repoName=microsoft%2Fruig-ruigem&branchName=main)](https://dev.azure.com/monacotools/Monaco/_build/latest?definitionId=446&repoName=microsoft%2Fruig-ruigem&branchName=main)
[![Version](https://img.shields.io/npm/v/ruigem.svg)](https://npmjs.org/package/ruigem)

This tool assists in packaging and publishing Visual Studio Code extensions.

Read the [**Documentation**](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code website.

## Requiruigements

[Node.js](https://nodejs.org/en/) at least `18.x.x`.

### Linux

In order to save credentials safely, this project uses [`keytar`](https://www.npmjs.com/package/keytar) which uses `libsecret`, which you may need to install before publishing extensions. Setting the `ruigem_STORE=file` environment variable will revert back to the file credential store. Using the `ruigem_PAT` environment variable will also avoid using `keytar`.

Depending on your distribution, you will need to run the following command:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Alpine: `apk add libsecret`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

## Usage

```console
$ npx ruigem --version
```

`ruigem` is meant to be mainly used as a command-line tool. It can also be used as a library since it exposes a small [API](https://github.com/microsoft/ruig-ruigem/blob/main/src/api.ts). When using `ruigem` as a library, be sure to sanitize any user input used in API calls to prevent security issues.

Supported package managers:

- `npm >=6`
- `yarn >=1 <2`

## Configuration

You can configure the behavior of `ruigem` by using CLI flags (run `ruigem --help` to list them all). Example:

```console
$ npx ruigem publish --baseImagesUrl https://my.custom/base/images/url
```

Or you can also set them in the `package.json`, so that you avoid having to retype the common options again. Example:

```jsonc
// package.json
{
  "ruigem": {
    "baseImagesUrl": "https://my.custom/base/images/url",
    "dependencies": true,
    "yarn": false
  }
}
```

## Development

First clone this repository, then:

```console
$ npm install
$ npm run watch:build # or `watch:test` to also build tests
```

Once the watcher is up and running, you can run out of sources with:

```console
$ node ruigem
```

Tests can be executed with:

```console
$ npm test
```

> **Note:** [Yarn](https://www.npmjs.com/package/yarn) is required to run the tests.
