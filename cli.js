#! /usr/bin/env node
const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')
const Environment = require('./environment')
const { run } = require('./index')
const { formatLoxError } = require('./errors')

let options = {
  debug: false,
  history: 30,
  prompt: '>'
}

const printReturnValue = lastLine =>
  JSON.stringify(
    lastLine && typeof lastLine.toString === 'function' ? lastLine.toString() : lastLine
  )

const printErrorMessage = (e, code) => {
  if (options.debug) console.log(e)
  const { oneLiner, preErrorSection, errorSection, postErrorSection } = formatLoxError(e, code)
  console.error(oneLiner)
  if (errorSection) {
    console.error(preErrorSection + chalk.bgRed(errorSection) + postErrorSection)
  }
}

const makeCLIEnvironment = () => {
  const env = new Environment()
  env.setBuiltin('readFile', (_vars, args) => fs.readFileSync(args[0], 'utf8'))
  return env
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
  const env = makeCLIEnvironment()

  lineReader.on('line', line => {
    let code = line
    if (!line.endsWith(';') && !line.endsWith('}')) code += ';'
    // TODO: Support multi-line block statements
    try {
      const lastLine = run(code, env, console.log, options.debug)
      console.log(printReturnValue(lastLine))
      process.stdout.write(prompt)
    } catch (e) {
      printErrorMessage(e, code)
    }
  })
}

const runFile = filename => {
  try {
    const file = fs.readFileSync(filename, 'utf8')
    const env = makeCLIEnvironment()
    try {
      run(file, env, console.log, options.debug)
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
        const [_, option, value] = match
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
  process.title = 'YALI'
  const args = processOptions(argv.slice(2))
  if (options.debug) console.log(options)
  if (args.length > 1) {
    console.error('Usage: yali [script]')
    return 64
  } else if (args.length === 1) {
    runFile(args[0])
  } else {
    runPrompt()
  }
}

return main(process.argv)
