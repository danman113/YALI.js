const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const { Interpreter, LoxClass, LoxInstance } = require('./interpreter')
const Environment = require('./environment')

const run = (code, environment, printfn, debug = false) => {
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
}

const parse = code => {
  const tokenizer = new Tokenizer(code)
  const tokens = tokenizer.scanTokens()
  const parser = new Parser(tokens)
  const statements = parser.parse()
  return statements
}

module.exports = {
  run,
  parse,
  Parser,
  LoxClass,
  Tokenizer,
  LoxInstance,
  Interpreter,
  Environment
}
