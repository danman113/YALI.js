#! /usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const { LoxError } = require('./errors')
const interpret = require('./interpreter')

const run = code => {
  try {
    const tokenizer = new Tokenizer(code)
    const tokens = tokenizer.scanTokens()
    console.log(tokens)
    const parser = new Parser(tokens)
    const expr = parser.expression()
    console.log(expr)
    console.log(JSON.stringify(interpret(expr)))
  } catch (e) {
    if (e instanceof LoxError) {
      console.error('Parse Error:', e.toString(), `at ${e.endCoordinates.line}:${e.endCoordinates.col + 1}`)
      const lastIndex = code.lastIndexOf('\n', e.startCoordinates.index)
      const preErrorStart = lastIndex < 0 ? 0 : lastIndex
      const preErrorSection = code.substr(preErrorStart, e.startCoordinates.index)
      const errorSection = code.substr(e.startCoordinates.index, e.endCoordinates.index)
      console.error(preErrorSection + chalk.bgRed(errorSection))
    } else {
      console.log('Unexpected javascript Error: ')
      console.log(e)
    }
  }
}

const runPrompt = () => {
  process.stdout.write('> ')
  const lineReader = readline.createInterface({
    input: process.stdin
  })

  lineReader.on('line', line => {
    run(line)
    process.stdout.write('> ')
  })
}

const readFile = filename => {
  try {
    const file = fs.readFileSync(filename, 'utf8')
    run(file)
  } catch (e) {
    console.error(`YALI could not read the file ${filename}`)
    console.error(e)
  }
}

const main = argv => {
  const args = argv.slice(2)
  if (args.length > 1) {
    console.error("Usage: jlox [script]")
    return 64
  } else if (args.length === 1) {
    readFile(args[0])
  } else {
    runPrompt()
  }
}

return main(process.argv)