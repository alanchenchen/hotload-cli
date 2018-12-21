# hotload-cli

![](https://img.shields.io/npm/v/hotload-cli.svg)
![](https://img.shields.io/npm/dt/hotload-cli.svg)
![](https://img.shields.io/github/license/alanchenchen/hotload-cli.svg)

> A CLI to run a javascrpit or cmd by hot-reloading

> version:  0.0.2

> Author:  Alan Chen

> Date: 2018/08/23

[中文文档](./ChineseREADME.md)

## Features
1. suppot watching nodejs and reloading itself。
2. suppot watching nodejs and reloading another nodejs。
3. suppot watching nodejs and reloading another command。
4. good performance and cpu/memory occupancy。
5. there are two node processes occupied at most while you use CLI。


## Usage Help
* `npm install -g hotload-cli` install npm package globally. 
* input the `hotload` or `hotload -h` or `hotload --help` in your cmd or terminal
``` bash
$ hotload

  Usage: hotload <args>

    A tool for hot-reloading nodejs

  Options:

    --load           watch file but hot-reload anohter file
    --cmd            watch file but hot-reload a cmd
    -V, --version    output the version number
    -h, --help       output usage information

hotload must be before a valid nodejs with .js extname
```

## Options
### -V | --version 
show the version number of CLI
``` bash
$ hotload -V

0.0.1
```

### --load 
watch a nodejs but reloading another nodejs
``` bash
$ hotload server.js --load router.js

hotload is starting with server.js
command is reloading...
server is running at http://localhost:3000
```

### --cmd 
watch a nodejs but reloading another command
``` bash
$ hotload server.js --cmd node -v

hotload is starting with server.js
v8.11.1
```
## Attentions
* hotlad must be before a javascript file or directory

## To do
1. support watching various kinds of file, not only nodejs
2. support watching dependence modules file in a nodejs


