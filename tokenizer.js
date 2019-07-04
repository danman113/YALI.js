const { LoxError } = require('./errors')
const noop = () => {}

const tokens = `
  LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE,
  COMMA, DOT, MINUS, PLUS, SEMICOLON, SLASH, STAR,

  BANG, BANG_EQUAL,
  EQUAL, EQUAL_EQUAL,
  GREATER, GREATER_EQUAL,
  LESS, LESS_EQUAL,

  IDENTIFIER, STRING, NUMBER,

  AND, CLASS, ELSE, FALSE, FUN, FOR, IF, NIL, OR,
  PRINT, RETURN, SUPER, THIS, TRUE, VAR, WHILE,

  EOF
`
  .split(',')
  .map(token => token.trim())

let tokenEnum = {}
tokens.forEach((token, i) => {
  tokenEnum[token] = i
})

const keywords = new Map(Object.entries({
  and: tokenEnum.AND,
  class: tokenEnum.CLASS,
  else: tokenEnum.ELSE,
  false: tokenEnum.FALSE,
  for: tokenEnum.FOR,
  fun: tokenEnum.FUN,
  if: tokenEnum.IF,
  nil: tokenEnum.NIL,
  or: tokenEnum.OR,
  print: tokenEnum.PRINT,
  return: tokenEnum.RETURN,
  super: tokenEnum.SUPER,
  this: tokenEnum.THIS,
  true: tokenEnum.TRUE,
  var: tokenEnum.VAR,
  while: tokenEnum.WHILE
}))

const tokenMap = {
  '(': tokenizer => {
    tokenizer.addToken(tokenEnum.LEFT_PAREN)
  },
  ')': tokenizer => {
    tokenizer.addToken(tokenEnum.RIGHT_PAREN)
  },
  '{': tokenizer => {
    tokenizer.addToken(tokenEnum.LEFT_BRACE)
  },
  '}': tokenizer => {
    tokenizer.addToken(tokenEnum.RIGHT_BRACE)
  },
  ',': tokenizer => {
    tokenizer.addToken(tokenEnum.COMMA)
  },
  '.': tokenizer => {
    // Handles leading decimals for number literals
    if (isDigit(tokenizer.peek())) {
      tokenizer.handleNumberLiterals()
    } else {
      tokenizer.addToken(tokenEnum.DOT)
    }
  },
  '-': tokenizer => {
    tokenizer.addToken(tokenEnum.MINUS)
  },
  '+': tokenizer => {
    tokenizer.addToken(tokenEnum.PLUS)
  },
  ';': tokenizer => {
    tokenizer.addToken(tokenEnum.SEMICOLON)
  },
  '/': tokenizer => {
    if (tokenizer.nextMatch('/')) {
      // Eat all those delish comments
      while (tokenizer.peek() !== '\n' && tokenizer.peek() !== '') tokenizer.chomp()
    } else {
      tokenizer.addToken(tokenEnum.SLASH)
    }
  },
  '*': tokenizer => {
    tokenizer.addToken(tokenEnum.STAR)
  },
  '!': tokenizer => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.BANG_EQUAL : tokenEnum.BANG)
  },
  '=': tokenizer => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.EQUAL_EQUAL : tokenEnum.EQUAL)
  },
  '>': tokenizer => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.GREATER_EQUAL : tokenEnum.GREATER)
  },
  '<': tokenizer => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.LESS_EQUAL : tokenEnum.LESS)
  },
  ' ': noop,
  '\t': noop,
  '\r': noop,
  '\n': tokenizer => {
    tokenizer.newline()
  },
  '"': tokenizer => {
    tokenizer.handleStringLiterals()
  }
}

const isDigit = str => /\d/.test(str)
const isAlpha = str => /[a-zA-Z_]/.test(str)
const isAlphaNumeric = str => isAlpha(str) || isDigit(str)

class Tokenizer {
  static get tokens() {
    return tokens
  }

  static get tokenEnum() {
    return tokenEnum
  }
  constructor(source) {
    this.source = source
    this.length = source.length
    this.tokens = []
    this.startPosition = null
    this.column = 0
    this.start = 0
    this.line = 1
    this.current = 0
  }

  handleStringLiterals() {
    while (this.peek() !== '"' && this.peek() !== '') {
      if (this.peek() === '\n') this.newline()
      this.chomp()
    }
    if (this.peek() === '')
      throw new LoxError('Unfinished string', this.startPosition, this.endPosition)
    this.chomp()
    const value = this.source.substring(this.start + 1, this.current - 1)
    this.addToken(tokenEnum.STRING, value)
  }

  handleNumberLiterals() {
    let hasDecimal = false
    while (isDigit(this.peek()) || (!hasDecimal && this.peek() === '.')) {
      if (this.peek() === '.') hasDecimal = true
      this.chomp()
    }
    const value = this.source.substring(this.start, this.current)
    this.addToken(tokenEnum.NUMBER, parseFloat(value))
  }

  handleIdentifiers() {
    while (isAlphaNumeric(this.peek())) this.chomp()
    const value = this.source.substring(this.start, this.current)
    if (keywords.has(value)) {
      this.addToken(keywords.get(value), value)
    } else {
      this.addToken(tokenEnum.IDENTIFIER, value)
    }
  }

  scanTokens() {
    while (this.current < this.length) {
      const c = this.chomp()
      this.startPosition = new Coordinate(this.column - 1, this.line, this.current - 1)
      if (!tokenMap[c]) {
        if (isDigit(c)) {
          this.handleNumberLiterals()
        } else if (isAlpha(c)) {
          this.handleIdentifiers()
        } else {
          // Column isn't -1 because we haven't iterated column yet
          throw new LoxError(
            `Unexpected character ${c}`,
            this.startPosition,
            new Coordinate(this.column, this.line, this.current)
          )
        }
      } else {
        tokenMap[c](this)
      }
      this.start = this.current
    }
    this.addToken(tokenEnum.EOF)
    return this.tokens
  }

  get endPosition() {
    return new Coordinate(this.column - 1, this.line, this.current)
  }

  addToken(type, literal = null) {
    const text = this.source.substring(this.start, this.current)
    this.tokens.push(
      new Token(
        type,
        text,
        literal,
        new Coordinate(this.column, this.line, this.current),
        this.startPosition
      )
    )
  }

  increment() {
    this.current++
    this.column++
  }

  newline() {
    this.line++
    this.column = 0
  }

  chomp() {
    this.increment()
    return this.source.charAt(this.current - 1)
  }

  peek() {
    return this.source.charAt(this.current)
  }

  nextMatch(expected) {
    if (this.peek() !== expected) return false
    this.increment()
    return true
  }
}

class Coordinate {
  constructor(col, line, index) {
    this.col = col
    this.line = line
    this.index = index
  }
}

class Token {
  constructor(type, lexeme, literal, endCoordinates, startCoordinates) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
    this.startCoordinates = startCoordinates
    this.endCoordinates = endCoordinates
  }
}

module.exports = Tokenizer
