const chalk = require('chalk')

// default doc while you input hotload or hotload (-h | --help)
const defaultDoc = chalk`
  {blue Usage:} hotload <file | directory> [--cmd] [--load] [--param] <args>

    A tool for hot-reloading nodejs

  {blue Options:}
      
    {green --param, -p}      {white hot-reload with some arguments}
    {green --load, -l}       {white watch file or directory but hot-reload anohter nodejs}
    {green --cmd, -c}        {white watch file or directory but hot-reload a cmd}
    {green -V, --version}    {white output the version number}
    {green -h, --help}       {white output usage information}
`

// param doc while you input hotload (--param | -p) (--help | h) 
const paramDoc = chalk`
  {blue Usage:} hotload <file | directory> --param <arguments>

  {blue Example:}
      
    {gray # watch a nodejs and reload itself with some arguments}
    {white $ hotload std.js --param npm github}

    {gray # watch a file and reload another nodejs with some arguments}
    {white $ hotload index.css --load std.js --param npm github}

    {gray # watch a directory and reload another nodejs with some arguments}
    {white $ hotload ./example --load std.js --param npm github}

`

// load doc while you input hotload (--load | -l) (--help | h) 
const loadDoc = chalk`
  {blue Usage:} hotload <file | directory> --load <nodejs>

  {blue Example:}
      
    {gray # watch a nodejs and reload another nodejs}
    {white $ hotload http.js --load std.js}

    {gray # watch a file and reload another nodejs}
    {white $ hotload index.css --load std.js}

    {gray # watch a directory and reload another nodejs}
    {white $ hotload ./example --load std.js}
`

// cmd doc while you input hotload (--cmd | -c) (--help | h) 
const cmdDoc = chalk`
  {blue Usage:} hotload <file | directory> --cmd <commands>

  {blue Example:}
      
    {gray # watch a nodejs but reload with outputing node version to stdout}
    {white $ hotload std.js --cmd node -v}

    {gray # watch a file but reload with outputing node version to stdout}
    {white $ hotload index.css --cmd node -v}

    {gray # watch a directory but reload with outputing node version to stdout}
    {white $ hotload ./example --cmd node -v}
`

module.exports = {
    defaultDoc,
    paramDoc,
    loadDoc,
    cmdDoc
}