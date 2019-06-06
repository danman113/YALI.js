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
  constructor(val) {
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

const formatLoxError = (e, code) => {
  if (e instanceof LoxError) {
    const frontIndex = code.lastIndexOf('\n', e.startCoordinates.index)
    const preErrorStart = frontIndex < 0 ? 0 : frontIndex
    const preErrorSection = code.substring(preErrorStart, e.startCoordinates.index)

    // Error String
    const errorSection = code.substring(e.startCoordinates.index, e.endCoordinates.index)

    // Post Error String
    const backIndex = code.indexOf('\n', e.endCoordinates.index)
    const postErrorStart = backIndex < 0 ? code.length : backIndex
    const postErrorSection = code.substring(e.endCoordinates.index, postErrorStart)

    // Print Critical Code
    return {
      oneLiner:
        `Parse Error: ${e.toString()} at ${e.endCoordinates.line}:${e.endCoordinates.col + 1}`,
      preErrorSection,
      errorSection,
      postErrorSection
    }
  } else {
    return { oneLiner: `Unexpected javascript Error: ${e}` }
  }
}

module.exports = {
  error,
  LoxError,
  ReturnError,
  runtimeError,
  parseError,
  formatLoxError
}
