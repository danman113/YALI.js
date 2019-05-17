const tokenizer = require('./tokenizer')
const token = tokenizer.tokenEnum

const nullable = str => (str ? str : '')

class LoxError {
  constructor(msg, startCoordinates, endCoordinates) {
    this.msg = msg
    this.startCoordinates = startCoordinates
    this.endCoordinates = endCoordinates
  }

  toString() {
    return this.msg
  }
}

class ReturnError {
  constructor (val) {
    this.value = val
  }
}

const error = (msg, startCoordinates, endCoordinates) =>
  new LoxError(msg, startCoordinates, endCoordinates)

const parseError = (msg, token) => {
  if (token.type === token.EOF) {
    return new LoxError(msg, token.startCoordinates, token.endCoordinates)
  } else {
    return new LoxError(
      `${nullable(token.lexeme && `at "${token.lexeme}": `)}${msg}`,
      token.startCoordinates,
      token.endCoordinates
    )
  }
}

const runtimeError = (msg, token) =>
  new LoxError(
    `${nullable(token.lexeme && `at "${token.lexeme}": `)}${msg}`,
    token.startCoordinates,
    token.endCoordinates
  )

module.exports = {
  error,
  LoxError,
  ReturnError,
  runtimeError,
  parseError
}
