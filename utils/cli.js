const { resolve, join } = require('path')
const chalk = require('chalk')
const { accessSync } = require('fs')

const ROOTPATH = process.cwd()

// CLI contents that contain Usage and Options 
const showUsage = () => {
    console.log(chalk`
  {blue Usage:} hotload <args>

    A tool for hot-reloading nodejs

  {blue Options:}
        
    {green --load}           {white watch file but hot-reload anohter file}
    {green --cmd}            {white watch file but hot-reload a cmd}
    {green -V, --version}    {white output the version number}
    {green -h, --help}       {white output usage information}
    `)
}
// check the target nodejs that will be watched and the options like -V , -h
const checkFirstParam = param => {
    if(/\.js$/.test(param)) {
        const filePath = resolve(ROOTPATH, param)
        const isFileAccess = accessSync(filePath)
        
        if(isFileAccess === undefined) {
            return {
                index: 0,
                type: 'file',
                val: filePath
            }
        }
    }
    else if(param === '-V' || param === '--version') {
        return { 
            index: 0,
            type: 'version' 
        }
    }
    else if(param === '-h' || param === '--help') {
        return { 
            index: 0,
            type: 'help' 
        }
    }
    else {
        return {
            index: 0,
            type: 'error' 
        }
    }
}
// check the options like --load, --cmd and the following file or the command
const checkRestParam = param => {
    const flag = param[0]
    const restP = param.slice(1)

    if(flag === undefined) {
        return {
            index: 1,
            type: 'null',
            val: undefined
        }
    }
    else if(flag === '--load') {
        const val = restP[0]
                    ? join(ROOTPATH, restP[0])
                    : ''
        return {
            index: 1,
            type: 'load',
            val
        }
    }
    else if(flag === '--cmd') {
        return {
            index: 1,
            type: 'cmd', 
            val: restP
        }
    }
    else {
        return {
            index: 1,
            type: 'error'
        }
    }
}

const cli = (params) => {
    return new Promise((resolve, reject) => {
        const firstParam = params[0]
        const restParams = params.slice(1)
    
        const checkFirstResult = checkFirstParam(firstParam)
        const checkRestResult = checkRestParam(restParams)
        
        if(checkFirstResult.type == 'file') {
            // if the second option is invalid not like --cmd, --load or undefined
            // 当第二个参数无效，比如不是--cmd，--load或者不传，reject
            if(checkRestResult.type == 'error') {
                reject(checkRestResult)
            }
            // only if the target nodejs and the flag are all valid, resolve the nodejs and the following file or command
            // 只有第一个参数为一个有效的nodejs路径，第二个参数有效，才resolve，传入一个包含监听js路径和热更新js(命令)的对象
            else {
                resolve({file: checkFirstResult.val, res: checkRestResult})
            }
        } 
        else {
            // if the first option is -V, -h or undefined
            // 当第一个参数为-V，-h或不填入的时候，reject
            reject(checkFirstResult)
        }
    })
}

module.exports = {
    cli,
    showUsage
}

  


    