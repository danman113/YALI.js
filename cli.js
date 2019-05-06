#! /usr/bin/env node
const fs = require('fs')
const readline = require('readline')
const Environment = require('./environment')
const { run } = require('./index')

let options = {
  debug: false,
  history: 30,
  prompt: '>'
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
  env.setBuiltin('readFile', (_vars, args) => fs.readFileSync(args[0], 'utf8'))

  lineReader.on('line', line => {
    let code = line
    if (!line.endsWith(';') && !line.endsWith('}')) code += ';'
    // TODO: Support multi-line block statements
    const lastLine = run(code, env, options.debug)
    console.log(JSON.stringify(lastLine))
    process.stdout.write(prompt)
  })
}

const runFile = filename => {
  try {
    const file = fs.readFileSync(filename, 'utf8')
    run(file, undefined, options.debug)
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
    console.error('Usage: jlox [script]')
    return 64
  } else if (args.length === 1) {
    runFile(args[0])
  } else {
    runPrompt()
  }
}

return main(process.argv)
