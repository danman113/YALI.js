#! /usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const { LoxError } = require('./errors')
const Interpreter = require('./interpreter')
const Environment = require('./environment')

let options = {
  debug: false,
  history: 30,
  prompt: '>'
}

const run = (code, environment) => {
  try {
    const tokenizer = new Tokenizer(code)
    const tokens = tokenizer.scanTokens()
    if (options.debug) console.log(tokens)
    const parser = new Parser(tokens)
    const statements = parser.parse()
    if (options.debug) console.log(statements)
    const interpreter = new Interpreter(environment)
    let lastStatement
    for (let statement of statements) {
      lastStatement = interpreter.interpret(statement)
    }
    return lastStatement
  } catch (e) {
    if (e instanceof LoxError) {
      console.error('Parse Error:', e.toString(), `at ${e.endCoordinates.line}:${e.endCoordinates.col + 1}`)

      // Pre Error String
      const frontIndex = code.lastIndexOf('\n', e.startCoordinates.index)
      const preErrorStart = frontIndex < 0 ? 0 : frontIndex
      const preErrorSection = code.substr(preErrorStart, e.startCoordinates.index)

      // Error String
      const errorSection = code.substr(e.startCoordinates.index, e.endCoordinates.index)

      // Post Error String
      const backIndex = code.indexOf('\n', e.endCoordinates.index)
      const postErrorStart = backIndex < 0 ? code.length : backIndex
      const postErrorSection = code.substr(e.endCoordinates.index, postErrorStart)

      // Print Critical Code
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
  const env = new Environment()

  lineReader.on('line', line => {
    let code = line
    if (!line.endsWith(';')) code += ';'
    // TODO: Support multi-line block statements
    const lastLine = run(code, env)
    console.log(JSON.stringify(lastLine))
    process.stdout.write(prompt)
  })
}

const runFile = filename => {
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
    runFile(args[0])
  } else {
    runPrompt()
  }
}

return main(process.argv)