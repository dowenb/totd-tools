totd-tools
==========

Tester of The Day CLI tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/totd-tools.svg)](https://npmjs.org/package/totd-tools)
[![CircleCI](https://circleci.com/gh/dowenb/totd-tools/tree/master.svg?style=shield)](https://circleci.com/gh/dowenb/totd-tools/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/totd-tools.svg)](https://npmjs.org/package/totd-tools)
[![License](https://img.shields.io/npm/l/totd-tools.svg)](https://github.com/dowenb/totd-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g totd-tools
$ totd COMMAND
running command...
$ totd (-v|--version|version)
totd-tools/0.0.0 win32-x64 node-v12.18.3
$ totd --help [COMMAND]
USAGE
  $ totd COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`totd hello [FILE]`](#totd-hello-file)
* [`totd help [COMMAND]`](#totd-help-command)
* [`totd interview [FILE]`](#totd-interview-file)

## `totd hello [FILE]`

describe the command here

```
USAGE
  $ totd hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ totd hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/dowenb/totd-tools/blob/v0.0.0/src/commands/hello.ts)_

## `totd help [COMMAND]`

display help for totd

```
USAGE
  $ totd help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `totd interview [FILE]`

Convert CSV from of Interviews to Markdown

```
USAGE
  $ totd interview [FILE]

OPTIONS
  -f, --force
  -h, --help     show CLI help
  -v, --version  show CLI version

EXAMPLE
  $ totd interview ./input/input.csv
  hello world from ./src/hello.ts!
```

_See code: [src/commands/interview.ts](https://github.com/dowenb/totd-tools/blob/v0.0.0/src/commands/interview.ts)_
<!-- commandsstop -->
