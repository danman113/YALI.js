const tokenizer = require('./tokenizer')
const { Binary, Unary, Literal, Grouping } = require('./types')
const Error = require('./errors').error
const token = tokenizer.tokenEnum

class Parser {
  constructor (tokens) {
    this.tokens = tokens
    this.current = 0
  }

  expression () {
    return this.equality()
  }


  matchBinary (method, ...operators) {
    let expr = this[method]()
    while(this.match(...operators)) {
      const operator = this.previous()
      const right = this.comparison()
      expr = Binary(expr, operator, right)
    }
    return expr
  }

  equality () {
    return this.matchBinary('comparison', token.BANG_EQUAL, token.DOUBLE_EQUAL)
  }

  comparison () {
    return this.matchBinary('addition', token.GREATER, token.GREATER_EQUAL, token.LESS, token.LESS_EQUAL)
  }

  addition () {
    return this.matchBinary('multiplication', token.MINUS, token.PLUS)
  }

  multiplication () {
    return this.matchBinary('unary', token.SLASH, token.STAR)
  }

  unary () {
    if (this.match(token.BANG, token.MINUS)) {
      const operator = this.previous()
      const right = this.unary()
      return Unary(operator, right)
    }
    return this.primary()
  }

  primary () {
    if (this.match(token.FALSE)) return Literal(false)
    if (this.match(token.TRUE)) return Literal(true)
    if (this.match(token.NIL)) return Literal(null)
    if (this.match(token.NUMBER, token.STRING)) return Literal(this.previous().literal)

    if (this.match(token.LEFT_PAREN)) {
      const expr = this.expression()
      this.consume(token.RIGHT_PAREN, `Expect ')' after expression.`)
      return Grouping(expr)
    }
  }

  consume (type, err) {
    if (this.check(type)) return this.advance()

    throw Error(err, this.peek().endCoordinates.line)
  }

  match (...tokens) {
    for (let token of tokens) {
      if (this.check(token)) {
        this.advance()
        return true
      }
    }

    return false
  }

  check (type) {
    return !this.isAtEnd && this.peek().type === type
  }

  get isAtEnd () {
    return this.peek().type === token.EOF
  }

  peek () {
    return this.tokens[this.current]
  }

  previous () {
    if (this.current <= 0) throw Error('Expected previous but found nothing', this.peek().endCoordinates.line)
    return this.tokens[this.current - 1]
  }

  advance () {
    if (!this.isAtEnd) this.current++
    return this.previous()
  }
}

module.exports = Parser