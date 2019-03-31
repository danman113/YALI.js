const Error = require('./errors').error
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
`.split(',').map(token => token.trim())


let tokenEnum = {}
tokens.forEach((token, i) => {
  tokenEnum[token] = i
})

const keywords = {
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
  while: tokenEnum.WHILE,
}

const tokenMap = {
  '(': (tokenizer) => {
    tokenizer.addToken(tokenEnum.LEFT_PAREN)
  },
  ')': (tokenizer) => {
    tokenizer.addToken(tokenEnum.RIGHT_PAREN)
  },
  '{': (tokenizer) => {
    tokenizer.addToken(tokenEnum.LEFT_BRACE)
  },
  '}': (tokenizer) => {
    tokenizer.addToken(tokenEnum.RIGHT_BRACE)
  },
  ',': (tokenizer) => {
    tokenizer.addToken(tokenEnum.COMMA)
  },
  '.': (tokenizer) => {
    // Handles leading decimals for number literals
    if (isDigit(tokenizer.peek())) {
      tokenizer.handleNumberLiterals()
    } else {
      tokenizer.addToken(tokenEnum.DOT)
    }
  },
  '-': (tokenizer) => {
    tokenizer.addToken(tokenEnum.MINUS)
  },
  '+': (tokenizer) => {
    tokenizer.addToken(tokenEnum.PLUS)
  },
  ';': (tokenizer) => {
    tokenizer.addToken(tokenEnum.SEMICOLON)
  },
  '/': (tokenizer) => {
    if (tokenizer.nextMatch('/')) {
      // Eat all those delish comments
      while(tokenizer.peek() !== '\n' && tokenizer.peek() !== '') tokenizer.chomp()
    } else {
      tokenizer.addToken(tokenEnum.SLASH)
    }
  },
  '*': (tokenizer) => {
    tokenizer.addToken(tokenEnum.STAR)
  },
  '!': (tokenizer) => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.BANG_EQUAL : tokenEnum.BANG)
  },
  '=': (tokenizer) => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.EQUAL_EQUAL : tokenEnum.EQUAL)
  },
  '>': (tokenizer) => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.GREATER_EQUAL : tokenEnum.GREATER)
  },
  '<': (tokenizer) => {
    tokenizer.addToken(tokenizer.nextMatch('=') ? tokenEnum.LESS_EQUAL : tokenEnum.LESS)
  },
  ' ': noop,
  '\t': noop,
  '\r': noop,
  '\n': (tokenizer) => {
    tokenizer.line++
  },
  '"': (tokenizer) => {
    tokenizer.handleStringLiterals()
  }
}

const isDigit = str => /\d/.test(str)
const isAlpha = str => /[a-zA-Z_]/.test(str)
const isAlphaNumeric = str => isAlpha(str) || isDigit(str)

class Tokenizer {
  constructor (source) {
    this.source = source
    this.length = source.length
    this.tokens = []
    this.start = 0
    this.line = 1
    this.current = 0
  }

  handleStringLiterals () {
    while(this.peek() !== '"' && this.peek() !== '') {
      if (this.peek() === '\n') this.line++
      this.chomp()
    }
    if (this.peek() === '') throw Error('Unfinished string', this.line)
    this.chomp()
    const value = this.source.substring(this.start + 1, this.current - 1)
    this.addToken(tokenEnum.STRING, value)
  }

  handleNumberLiterals () {
    let hasDecimal = false
    while(isDigit(this.peek()) || (!hasDecimal && this.peek() === '.')) {
      if (this.peek() === '.') hasDecimal = true
      this.chomp()
    }
    const value = this.source.substring(this.start, this.current)
    this.addToken(tokenEnum.NUMBER, parseFloat(value))
  }

  handleIdentifiers () {
    while (isAlphaNumeric(this.peek())) this.chomp()
    const value = this.source.substring(this.start, this.current)
    if (keywords[value]) {
      this.addToken(keywords[value], value)
    } else {
      this.addToken(tokenEnum.IDENTIFIER, value)
    }
  }

  scanTokens () {
    while (this.current < this.length) {
      const c = this.chomp()
      if (!tokenMap[c]) {
        if (isDigit(c)) {
          this.handleNumberLiterals()
        } else if (isAlpha(c)) {
          this.handleIdentifiers()
        } else {
          throw Error(`Unexpected character ${c}`, this.line)
        }
      } else {
        tokenMap[c](this)
      }
      this.start = this.current
    }
    return this.tokens
  }

  addToken (type, literal = null) {
    const text = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, text, literal, this.line))
  }

  chomp () {
    this.current++
    return this.source.charAt(this.current - 1)
  }

  peek () {
    return this.source.charAt(this.current)
  }

  nextMatch (expected) {
    if (this.peek() !== expected) return false
    this.current++
    return true
  }

}

class Token {
  constructor (type, lexeme, literal, line) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
    this.line = line
  }
}

module.exports = Tokenizer
