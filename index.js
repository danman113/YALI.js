const chalk = require('chalk')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const { LoxError } = require('./errors')
const Interpreter = require('./interpreter')
const Environment = require('./environment')

const run = (code, environment, printfn, debug = false) => {
  try {
    const tokenizer = new Tokenizer(code)
    const tokens = tokenizer.scanTokens()
    if (debug) console.log(tokens)
    const parser = new Parser(tokens)
    const statements = parser.parse()
    if (debug) console.log(statements)
    const interpreter = new Interpreter(environment, printfn)
    let lastStatement
    for (let statement of statements) {
      lastStatement = interpreter.interpret(statement)
    }
    return lastStatement
  } catch (e) {
    console.log(e)
    if (e instanceof LoxError) {
      console.error(
        'Parse Error:',
        e.toString(),
        `at ${e.endCoordinates.line}:${e.endCoordinates.col + 1}`
      )

      // Pre Error String
      const frontIndex = code.lastIndexOf('\n', e.startCoordinates.index)
      const preErrorStart = frontIndex < 0 ? 0 : frontIndex
      const preErrorSection = code.substr(preErrorStart, e.startCoordinates.index)

      // Error String
      const errorSection = code.substr(e.startCoordinates.index, e.endCoordinates.index)

      // @TODO: Fix this
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

module.exports = {
  run,
  Environment
}
