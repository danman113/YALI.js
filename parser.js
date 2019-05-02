const tokenizer = require('./tokenizer')
const { Binary, Unary, Var, Literal, Grouping, PrintStatement, ExpressionStatement, VarStatement, Assignment, Block, Condition } = require('./types')
const { parseError: ParseError } = require('./errors')
const token = tokenizer.tokenEnum

class Parser {
  constructor (tokens) {
    this.tokens = tokens
    this.current = 0
  }

  expression () {
    return this.assignment()
  }

  parse () {
    let statements = []
    while (!this.isAtEnd) {
      statements.push(this.declaration())
    }

    return statements
  }

  assignment () {
    const expr = this.equality()
    if (this.match(token.EQUAL)) {
      const equalToken = this.previous()
      const value = this.assignment()
      if (expr instanceof Var) {
        const nameToken = expr.name
        return new Assignment(nameToken, value)
      }
      throw ParseError('Expected Expression', equalToken)
    }

    return expr
  }

  declaration () {
    if (this.match(token.VAR)) return this.varDeclaration()

    return this.statement()
  }

  varDeclaration () {
    const name = this.consume(token.IDENTIFIER, 'Expected variable name')
    let initializer = null
    if (this.match(token.EQUAL)) {
      initializer = this.expression()
    }

    this.consume(token.SEMICOLON, 'Expect ; after value.')
    return new VarStatement(name, initializer)
  }

  statement () {
    if (this.match(token.IF)) return this.ifStatement()
    if (this.match(token.PRINT)) return this.printStatement()
    if (this.match(token.LEFT_BRACE)) return new Block(this.block())

    return this.expressionStatement()
  }

  ifStatement () {
    this.consume(token.LEFT_PAREN, 'Expected "(" after "if"')
    const cond = this.expression()
    this.consume(token.RIGHT_PAREN, 'Expected ")" after expression')
    const ifBranch = this.statement()
    let elseBranch = null
    if (this.match(token.ELSE)) elseBranch = this.statement()

    return new Condition(cond, ifBranch, elseBranch)
  }


  block () {
    let statements = []
    while (!this.check(token.RIGHT_BRACE) && !this.isAtEnd) {
      statements.push(this.declaration())
    }

    this.consume(token.RIGHT_BRACE, 'Missing closing brace. (Expect "}" after block)')
    return statements
  }

  expressionStatement () {
    const val = this.expression()
    this.consume(token.SEMICOLON, 'Expect ; after value.')
    return new ExpressionStatement(val)
  }

  printStatement () {
    const val = this.expression()
    this.consume(token.SEMICOLON, 'Expect ; after value.')
    return new PrintStatement(val)
  }

  matchBinary (method, ...operators) {
    let expr = this[method]()
    while(this.match(...operators)) {
      const operator = this.previous()
      const right = this[method]()
      expr = new Binary(expr, operator, right)
    }
    return expr
  }

  equality () {
    return this.matchBinary('comparison', token.BANG_EQUAL, token.EQUAL_EQUAL)
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
      return new Unary(operator, right)
    }
    return this.primary()
  }

  primary () {
    if (this.match(token.FALSE)) return new Literal(false)
    if (this.match(token.TRUE)) return new Literal(true)
    if (this.match(token.NIL)) return new Literal(null)
    if (this.match(token.NUMBER, token.STRING)) return new Literal(this.previous().literal)
    if (this.match(token.IDENTIFIER)) return new Var(this.previous())

    if (this.match(token.LEFT_PAREN)) {
      const expr = this.expression()
      this.consume(token.RIGHT_PAREN, `Expect ')' after expression.`)
      return new Grouping(expr)
    }

    throw ParseError('Expected Expression', this.peek())
  }

  consume (type, err) {
    if (this.check(type)) return this.advance()

    throw ParseError(err, this.peek())
  }

  // Checks if current token is one of the following tokens and advances to next token
  match (...tokens) {
    for (let token of tokens) {
      if (this.check(token)) {
        this.advance()
        return true
      }
    }

    return false
  }

  // Verifies current token is equal to type
  check (type) {
    return !this.isAtEnd && this.peek().type === type
  }

  get isAtEnd () {
    return this.peek().type === token.EOF
  }

  // Gets current token
  peek () {
    return this.tokens[this.current]
  }

  // Gets previous token
  previous () {
    if (this.current <= 0) throw ParseError('Expected previous but found nothing', this.peek())
    return this.tokens[this.current - 1]
  }

  // Advances parser to the next token
  advance () {
    if (!this.isAtEnd) this.current++
    return this.previous()
  }
}

module.exports = Parser