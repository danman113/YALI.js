const { runtimeError } = require('./errors')

class Environment {
  constructor () {
    this.map = new Map()
  }

  get (varToken) {
    if (this.map.has(varToken.name.lexeme)) {
      return this.map.get(varToken.name.lexeme)
    }
    throw runtimeError(`Undefined variable "${varToken.name.lexeme}"`, varToken.name)
  }

  set (token, value) {
    if (this.map.has(token.lexeme)) {
      throw runtimeError(`Duplicate variable declaration "${token.lexeme}"`, token)
      // return this.map.set(token.lexeme, value)
    }
    return this.map.set(token.lexeme, value)
  }
}

module.exports = Environment