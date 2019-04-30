#! /usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const { LoxError } = require('./errors')
const Interpreter = require('./interpreter')

let options = {
  debug: false,
  history: 30,
  prompt: '>'
}

const interpreter = new Interpreter()

const run = code => {
  try {
    const tokenizer = new Tokenizer(code)
    const tokens = tokenizer.scanTokens()
    if (options.debug) console.log(tokens)
    const parser = new Parser(tokens)
    const statements = parser.parse()
    if (options.debug) console.log(statements, null, 2)
    let lastStatement
    for (let statement of statements) {
      lastStatement = interpreter.interpret(statement)
    }
    return lastStatement
  } catch (e) {
    if (e instanceof LoxError) {
      console.error('Parse Error:', e.toString(), `at ${e.endCoordinates.line}:${e.endCoordinates.col + 1}`)
      const frontIndex = code.lastIndexOf('\n', e.startCoordinates.index)
      const preErrorStart = frontIndex < 0 ? 0 : frontIndex
      const preErrorSection = code.substr(preErrorStart, e.startCoordinates.index)
      const errorSection = code.substr(e.startCoordinates.index, e.endCoordinates.index)
      const backIndex = code.indexOf('\n', e.endCoordinates.index)
      const postErrorStart = backIndex < 0 ? code.length : backIndex
      const postErrorSection = code.substr(e.endCoordinates.index, postErrorStart)
      console.error(preErrorSection + chalk.bgRed(errorSection) + postErrorSection)
    } else {
      console.log('Unexpected javascript Error: ')
      console.log(e)
    }
  }
}

const runPrompt = () => {
  const prompt = options.prompt + ' '
  process.stdout.write(prompt)
  const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: prompt,
    historySize: +options.history
  })

  lineReader.on('line', line => {
    let code = line
    if (!line.endsWith(';')) code += ';'
    const lastLine = run(code)
    console.log(JSON.stringify(lastLine))
    process.stdout.write(prompt)
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

const optionRegex = /--(\w+)(?:=(.+))?/
const processOptions = args =>
  args.map(arg => {
    const match = optionRegex.exec(arg)
    if (match) {
      const [_, option, value] = match
      if (!value) {
        options[option] = !options[option]
      } else {
        options[option] = value
      }
    } else {
      return arg
    }
  }).filter(Boolean)

const main = argv => {
  const args = processOptions(argv.slice(2))
  if (options.debug) console.log(options)
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