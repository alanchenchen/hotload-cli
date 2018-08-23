# hotload-cli
> A CLI to run a javascrpit or cmd by hot-reloading

> version:  0.0.1

> Author:  Alan Chen

> Date: 2018/08/23

## Features
> 一款支持监听nodejs文件并热更新的CLI工具
1. 支持监听nodejs文件并热更新本身。
2. 支持监听nodejs文件并热更新另一个指定的nodejs。
3. 支持监听nodejs文件并热更新另一个指定的命令。
4. 高性能和CPU内存占用合理。
5. 当在使用CLI时，最多只会占用两个nodejs进程。


## Usage Help
* `npm install -g hotload-cli` 全局安装. 
* 在cmd或terminal终端里输入`hotload`或 `hotload -h` 或`hotload --help`命令
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
显示CLI的版本号
``` bash
$ hotload -V

0.0.1
```

### --load 
监听一个nodejs文件但是热更新另一个指定的nodejs
``` bash
$ hotload server.js --load router.js

hotload is starting with server.js
command is reloading...
server is running at http://localhost:3000
```

### --cmd 
监听一个nodejs文件但是热更新另一个指定的命令
``` bash
$ hotload server.js --cmd node -v

hotload is starting with server.js
v8.11.1
```
## Attentions
* hotlad后面必须紧跟一个nodejs文件，否则会报错

## To do
1. 后续支持监听更多种类的文件，不局限于nodejs
2. 后续支持监听nodejs文件内的依赖包，例如required的npm包


