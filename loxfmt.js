#! /usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const { parse } = require('./index')
const { printLoxAST } = require('./transpilers/lox')
const { formatLoxError } = require('./errors')

let options = {}

const printErrorMessage = (e, code) => {
  const { oneLiner, preErrorSection, errorSection, postErrorSection } = formatLoxError(e, code)
  console.error(oneLiner)
  if (errorSection) {
    console.error(preErrorSection + chalk.bgRed(errorSection) + postErrorSection)
  }
}

const fmtFile = filename => {
  try {
    const file = fs.readFileSync(filename, 'utf8')
    try {
      const newText = parse(file)
        .map(stmt => printLoxAST(stmt, 0, options))
        .join('\n')
      if (!options.silent) console.log(newText)
      if (options.write) {
        fs.writeFileSync(filename, newText)
      }
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
  process.title = 'loxfmt'
  const args = processOptions(argv.slice(2))
  if (options.help) {
    console.log(
      `
  Usage: loxfmt [script]*

  Options:

    --write Writes linting to files

    --indent="{indentstring}" Defines indent string to use
    --spaceBeforeParams Adds space before params. fun hello() { => fun hello () {
    --functionNewlines Adds an extra newline after function bodies
    `
    )
    return 0
  }
  if (args.length >= 1) {
    args.forEach(fmtFile)
  } else {
    console.error('Usage: loxfmt [script]*')
    return 64
  }
}

return main(process.argv)
