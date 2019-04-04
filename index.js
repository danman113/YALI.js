#! /usr/bin/env node
const fs = require('fs')
const readline = require('readline')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
console.log(Tokenizer.tokenEnum)

const run = code => {
  const tokenizer = new Tokenizer(code)
  const tokens = tokenizer.scanTokens()
  console.log(tokens)
  const parser = new Parser(tokens)
  console.log(parser.expression())
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