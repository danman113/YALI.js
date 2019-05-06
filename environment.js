const { runtimeError } = require('./errors')

class Environment {
  constructor(enclosing) {
    this.map = new Map()
    this.enclosing = enclosing
  }

  get(varToken) {
    if (this.map.has(varToken.name.lexeme)) {
      return this.map.get(varToken.name.lexeme)
    }
    if (this.enclosing) return this.enclosing.get(varToken)
    throw runtimeError(`Undefined variable "${varToken.name.lexeme}"`, varToken.name)
  }

  set(token, value) {
    if (this.map.has(token.lexeme)) {
      throw runtimeError(`Duplicate variable declaration "${token.lexeme}"`, token)
      // return this.map.set(token.lexeme, value)
    }
    return this.map.set(token.lexeme, value)
  }

  setBuiltin(name, func) {
    this.map.set(name, typeof func === 'function' ? { call: func } : func)
  }

  assign(token, value) {
    if (!this.map.has(token.lexeme)) {
      if (this.enclosing) return this.enclosing.assign(token, value)
      throw runtimeError(`Undefined variable "${token.lexeme}"`, token)
    }
    return this.map.set(token.lexeme, value)
  }
}

module.exports = Environment
