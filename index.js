#! /usr/bin/env node
const fs = require('fs')
const readline = require('readline')
const Tokenizer = require('./tokenizer')

const run = code => {
  const tokenizer = new Tokenizer(code)
  console.log(tokenizer.scanTokens())
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