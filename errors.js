const tokenizer = require('./tokenizer')
const token = tokenizer.tokenEnum

const nullable = str => str ? str : ''



const error = (msg, startCoordinates, endCoordinates) =>
  new LoxError(msg, startCoordinates, endCoordinates )

class LoxError {
  constructor (msg, startCoordinates, endCoordinates) {
    this.msg = msg
    this.startCoordinates = startCoordinates
    this.endCoordinates = endCoordinates
  }

  toString () {
    return this.msg
  }
}

const parseError = (msg, token) => {
  if (token.type === token.EOF) {
    return new LoxError(msg, token.startCoordinates, token.endCoordinates)
  } else {
    return new LoxError(`${nullable(token.lexeme && `at "${token.lexeme}": `)}${msg}`, token.startCoordinates, token.endCoordinates)
  }
}
module.exports = {
  error,
  parseError
}