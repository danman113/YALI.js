#! /usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { parse } = require('./index')
const { loxToPython2 } = require('./transpilers/python')
const { formatLoxError } = require('./errors')

const lox_std_lib_shim = fs.readFileSync(path.resolve(__dirname, 'lox2python_std_lib.py'), 'utf8')

let options = {}

const printErrorMessage = (e, code) => {
  const { oneLiner, preErrorSection, errorSection, postErrorSection } = formatLoxError(e, code)
  console.error(oneLiner)
  if (errorSection) {
    console.error(preErrorSection + chalk.bgRed(errorSection) + postErrorSection)
  }
}

const fmtFile = (filename, outputfile = 'a.py') => {
  try {
    const file = fs.readFileSync(filename, 'utf8')
    try {
      const newText =
        lox_std_lib_shim +
        parse(file)
          .map(stmt => loxToPython2(stmt, 0, options))
          .join('\n')
      if (!options.silent) console.log(newText)
      if (options.write) fs.writeFileSync(outputfile, newText)
    } catch (e) {
      printErrorMessage(e, file)
    }
  } catch (e) {
    console.error(`YALI could not read the file ${filename}`)
    console.error(e)
  }
}

const optionRegex = /--(\w+)(?:=(.+))?/
const processOptions = args =>
  args
    .map(arg => {
      const match = optionRegex.exec(arg)
      if (match) {
        const [, option, value] = match
        if (!value) {
          options[option] = !options[option]
        } else {
          options[option] = value
        }
      } else {
        return arg
      }
    })
    .filter(Boolean)

const main = argv => {
  process.title = 'lox2python'
  const args = processOptions(argv.slice(2))
  if (options.help) {
    console.log('Usage: lox2python [script] --out="a.py"')
    return 0
  }

  if (args.length === 1) {
    fmtFile(args[0])
  } else {
    console.error('Usage: lox2python [script]')
    return 64
  }
}

main(process.argv)
