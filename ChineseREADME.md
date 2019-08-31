# hotload-cli

[![](https://img.shields.io/npm/v/hotload-cli.svg)](https://www.npmjs.com/package/hotload-cli)
![](https://img.shields.io/npm/dt/hotload-cli.svg)
![](https://img.shields.io/github/license/alanchenchen/hotload-cli.svg)

> 一款支持监听nodejs文件并热更新的CLI工具

> version:  0.2.0

> Author:  Alan Chen

> Date: 2019/09/01

## Features
1. 支持监听nodejs文件并热更新本身。
2. 支持监听任意类型文件或文件夹目录并热更新另一个指定的nodejs。
3. 支持监听任意类型文件或文件夹目录并热更新另一个指定的命令。
4. 支持热更新时给nodejs文件传入进程参数。
5. 高性能和CPU内存占用合理。
6. 当在使用CLI时，最多只会占用两个nodejs进程。


## Usage Help
* `npm install -g hotload-cli` 全局安装. 
* 在cmd或terminal终端里输入`hotload`或 `hotload -h` 或`hotload --help`命令
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
显示CLI的版本号
``` bash
$ hotload -V

0.0.3
```

### -h | --help 
显示CLI的帮助信息，可以指定显示具体option的帮助信息
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
监听任意类型文件或文件夹目录但是热更新另一个指定的nodejs
``` bash
$ hotload server.js --load router.js

hotload is starting with server.js
command is reloading...
server is running at http://localhost:3000
```

### --cmd | -c
监听任意类型文件或文件夹目录但是热更新另一个指定的命令
``` bash
$ hotload server.js --cmd node -v

hotload is starting with server.js
v8.11.1
```

### --param | -p
热更新时给nodejs文件传入进程参数
``` bash
$ hotload server.js --param hello world

hotload is starting with server.js
command is reloading...
```

## Attentions
* hotload后面必须紧跟一个文件或目录，必须保证路径有效，否则会报错

## To do
1. 后续支持监听nodejs文件内的依赖包，例如required的npm包

## license
* MIT

