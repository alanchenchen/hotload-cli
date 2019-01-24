/**
 * @module watch任意一个文件或目录，然后热更新某个nodejs，或者热更新某条命令的模块
 * @param {String} file required 可以是任意文件或目录，原则上是可以监听任意文件和目录，监听某个文件时，必须带上后缀名，但是当忽略第二个参数时，file必须为js文件
 * @param {String | Obejct | Function} loadFile unRequired 
 *          当为string时，必须是js文件
 *          当为object时，有两个key。target表示热更新文件，必须为js。params表示子进程的args参数
 *          当为function时，可以是任意命令操作，取决于开发者。但是必须return当前子进程实例child_process。需要注意exec和execFile的选择
 *          当为undefined 即不传该参数时，第一个参数file必须为js文件，表示热更新监听的js文件
 */

/** demo
 * 
    1. 监听一个nodejs，先启动子进程，然后热更新本身
        hotLoad('http.js')
    2. 监听一个nodejs，启动指定的nodejs子进程，然后热更新指定的nodejs
        hotLoad('http.js', 'std.js')
    3. 监听一个nodejs的对象参数写法，第一个参数仍是需要监听的文件或目录，第二个参数target是需要热更新的nodejs，params是启动子进程的args参数
        hotLoad('http.js', { target: 'http.js', params: ['--version', '--help']})
    4. 监听一个nodejs，启动指定的命令子进程，然后热更新指定的命令，当第二个参数为一个函数时，必须return 子进程实例child_process
        hotLoad('http.js', () => {
            return execFile('go', ['run', 'test.go'], (error, stdout, stderr) => {
                if (error) {
                    throw error
                }
                console.log(stdout)
            })
        })
    5. 监听一个go文件，启动指定的命令子进程，然后热更新指定的命令
        hotLoad('test.go', () => {
            return execFile('go', ['run', 'test.go'], (error, stdout, stderr) => {
                if (error) {
                    throw error
                }
                console.log(stdout)
            })
        })
    6. 监听一个目录，启动指定的nodejs子进程，然后热更新指定的nodejs
        hotLoad('example', 'std.js')
*/

const { watch } = require('fs')
const chalk = require('chalk')
const { resolve, basename } = require('path')
const { fork } = require('child_process')

// init a subProcess
const initProcess = (file, args = []) => {
   return fork(file, args, {cwd: __dirname})
}

// check the param format and new a child_process
const checkParam = (file, param) => {
    const isParamDefault = param === undefined
    const isParamStr = typeof param == 'string'
    const isParamObj = Object.prototype.toString.call(param) == '[object Object]'
    const isParamFn= Object.prototype.toString.call(param) == '[object Function]'
    
    if(isParamDefault) {
        return initProcess(file)
    }
    else if(isParamStr) {
        return initProcess(param)
    }
    else if(isParamObj) {
        return initProcess(param.target, param.params)        
    }
    else if(isParamFn) {
        return param()
    }
    else {
        throw new Error('Invalid arguments, arguments must be a file or a object with file options')
    }
}

// watch some files and reload automaticly some commands
const hotLoad = (file, loadFile) => {
    console.log(chalk.green(`hotload is starting with ${basename(file)}`))
    let subProcess = checkParam(file, loadFile)

    watch(resolve(__dirname, file), {recursive: true}, (type, name) => {
        // console.log(`${name} has been ${type}d`)
        // 通过child_process的connected属性来判断当前子进程是否与主进程通信，用作判断子进程是否会自动退出的依据
        // 避免fs.watch因为系统问题多次触发事件而重复打开进程
        const subProcessAutoFinished = (subProcess.connected === false && subProcess.exitCode == 0) // 正常自动退出code为0
                                    || (subProcess.connected === false && subProcess.exitCode == 1) // 出现未被捕获的异常或错误自动退出code为1
        const subProcessNeedKill = (subProcess.connected === true && !subProcess.killed) // 非自动退出killed默认为false，避免fs.watch因为系统问题多次触发事件而重复打开进程

        // 监听文件打开的进程会自动关闭，则再次启用一个子进程
        if(subProcessAutoFinished) {
            // console.log('我是自动结束进程')
            console.log(chalk.green('command is reloading...'))
            subProcess = null
            subProcess = checkParam(file, loadFile)
        }
        // 监听文件打开的进程不会自动关闭，先发送signal关闭，然后在exit事件回调中重新启用一个子进程
        else if(subProcessNeedKill) {
            // console.log('我不会结束进程')
            console.log(chalk.green('command is reloading...'))
            subProcess.kill('SIGKILL')
            subProcess.on('exit', (code, signal ) => {
                // console.log(`${name} process has been exited ,code: ${code}, signal: ${signal }`)
                const hasSubProcessExited = (code == 0 || signal == 'SIGKILL') && subProcess.killed
                if(hasSubProcessExited) {
                    subProcess = null
                    subProcess = checkParam(file, loadFile)
                }
            })
        }
    })  
    // 退出主进程时清空不会自动关闭的子进程
    process.on('exit', code => {
        if(subProcess.connected) {
            subProcess.kill('SIGKILL')
        }
    })   
}
module.exports = hotLoad