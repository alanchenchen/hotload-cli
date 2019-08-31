# hotload-cli

[![](https://img.shields.io/npm/v/hotload-cli.svg)](https://www.npmjs.com/package/hotload-cli)
![](https://img.shields.io/npm/dt/hotload-cli.svg)
![](https://img.shields.io/github/license/alanchenchen/hotload-cli.svg)

> A CLI to run a javascrpit or cmd by hot-reloading

> version:  0.2.0

> Author:  Alan Chen

> Date: 2019/09/01

[中文文档](./ChineseREADME.md)

## Features
1. support watching nodejs and reloading itself。
2. support watching any kind of file or a directory and reloading another nodejs。
3. support watching any kind of file or a directory and reloading another command。
4. support reloading nodejs with process arguments。
5. good performance and cpu/memory occupancy。
6. there are two node processes occupied at most while you use CLI。


## Usage Help
* `npm install -g hotload-cli` install npm package globally. 
* input the `hotload` or `hotload -h` or `hotload --help` in your cmd or terminal
``` bash
$ hotload

  Usage: hotload <file | directory> [--cmd] [--load] [--param] <args>

    A tool for hot-reloading nodejs

  Options:

    --param, -p      hot-reload with some arguments
    --load, -l       watch file or directory but hot-reload anohter nodejs
    --cmd, -c        watch file or directory but hot-reload a cmd
    -V, --version    output the version number
    -h, --help       output usage information
```

## Options
### -V | --version 
show the version number of CLI
``` bash
$ hotload -V

0.1.0
```

### -h | --help 
show the usage information of CLI
``` bash
$ hotload --cmd -h

  Usage: hotload <file | directory> --cmd <commands>

  Example:

    # watch a nodejs but reload with outputing node version to stdout
    $ hotload std.js --cmd node -v

    # watch a file but reload with outputing node version to stdout
    $ hotload index.css --cmd node -v

    # watch a directory but reload with outputing node version to stdout
    $ hotload ./example --cmd node -v

hotload must be before a valid file or directory path
```

### --load | -l
watch any kind of file or a directory but reloading another nodejs
``` bash
$ hotload server.js --load router.js

hotload is starting with server.js
command is reloading...
server is running at http://localhost:3000
```

### --cmd | -c
watch any kind of file or a directory but reloading another command
``` bash
$ hotload server.js --cmd node -v

hotload is starting with server.js
v8.11.1
```

### --param | -p
reload nodejs with process arguments
``` bash
$ hotload server.js --param hello world

hotload is starting with server.js
command is reloading...
```

## Attentions
* hotload must be before a valid file or directory path

## To do
1. support watching dependence modules file in a nodejs

## license
* MIT

