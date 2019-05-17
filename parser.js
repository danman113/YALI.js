const tokenizer = require('./tokenizer')
const {
  Binary,
  Unary,
  Var,
  Call,
  Literal,
  While,
  Grouping,
  Return,
  LoxFunction,
  PrintStatement,
  ExpressionStatement,
  VarStatement,
  Assignment,
  Logical,
  Block,
  Condition
} = require('./types')
const { parseError: ParseError } = require('./errors')
const token = tokenizer.tokenEnum

const FUNCTION_TYPE = 'function'

class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.current = 0
  }

  expression() {
    return this.assignment()
  }

  parse() {
    let statements = []
    while (!this.isAtEnd) {
      statements.push(this.declaration())
    }

    return statements
  }

  declaration() {
    if (this.match(token.FUN)) return this.fun(FUNCTION_TYPE)
    if (this.match(token.VAR)) return this.varDeclaration()

    return this.statement()
  }

  fun(type) {
    const name = this.consume(token.IDENTIFIER, `Expected ${type} name`)

    const params = []
    this.consume(token.LEFT_PAREN, `Expected paren after ${type} name`)
    if (!this.check(token.RIGHT_PAREN)) {
      do {
        params.push(this.consume(token.IDENTIFIER, 'Expected identifier'))
      } while (this.match(token.COMMA))
    }
    this.consume(token.RIGHT_PAREN, 'Expected paren after arguments')
    this.consume(token.LEFT_BRACE, 'Expected left brace after argument list')
    const body = this.block()
    return new LoxFunction(name, params, body)
  }

  varDeclaration() {
    const name = this.consume(token.IDENTIFIER, 'Expected variable name')
    let initializer = null
    if (this.match(token.EQUAL)) {
      initializer = this.expression()
    }

    this.consume(token.SEMICOLON, 'Expect ; after value.')
    return new VarStatement(name, initializer)
  }

  statement() {
    if (this.match(token.IF)) return this.ifStatement()
    if (this.match(token.FOR)) return this.forStatement()
    if (this.match(token.WHILE)) return this.whileStatement()
    if (this.match(token.RETURN)) return this.returnStatement()
    if (this.match(token.PRINT)) return this.printStatement()
    if (this.match(token.LEFT_BRACE)) return new Block(this.block())

    return this.expressionStatement()
  }

  returnStatement() {
    const prev = this.previous()
    let value = null
    if (!this.check(token.SEMICOLON)) {
      value = this.expression()
    }
    this.consume(token.SEMICOLON, 'Expected ";" after return value')
    return new Return(prev, value)
  }

  assignment() {
    const expr = this.or()
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

  or() {
    return this.matchBinary('and', Logical, token.OR)
  }

  and() {
    return this.matchBinary('equality', Logical, token.AND)
  }

  forStatement() {
    this.consume(token.LEFT_PAREN, 'Expected "(" after "for"')

    let init
    if (this.match(token.SEMICOLON)) {
      init = null
    } else if (this.match(token.VAR)) {
      init = this.varDeclaration()
    } else {
      init = this.expressionStatement()
    }

    let cond = null
    if (!this.check(token.SEMICOLON)) {
      cond = this.expression()
    }
    this.consume(token.SEMICOLON, 'Expected ";" after loop condition')

    let inc = null
    if (!this.check(token.RIGHT_PAREN)) {
      inc = this.expression()
    }
    this.consume(token.RIGHT_PAREN, 'Expected ")" after for clause')
    let body = this.statement()

    if (inc) {
      body = new Block([body, new ExpressionStatement(inc)])
    }
    if (!cond) cond = new Literal(true)
    body = new While(cond, body)
    if (init) body = new Block([init, body])

    return body
  }

  whileStatement() {
    this.consume(token.LEFT_PAREN, 'Expected "(" after "while"')
    const cond = this.expression()
    this.consume(token.RIGHT_PAREN, 'Expected ")" after expression')
    const body = this.statement()

    return new While(cond, body)
  }

  ifStatement() {
    this.consume(token.LEFT_PAREN, 'Expected "(" after "if"')
    const cond = this.expression()
    this.consume(token.RIGHT_PAREN, 'Expected ")" after expression')
    const ifBranch = this.statement()
    let elseBranch = null
    if (this.match(token.ELSE)) elseBranch = this.statement()

    return new Condition(cond, ifBranch, elseBranch)
  }

  block() {
    let statements = []
    while (!this.check(token.RIGHT_BRACE) && !this.isAtEnd) {
      statements.push(this.declaration())
    }

    this.consume(token.RIGHT_BRACE, 'Missing closing brace. (Expect "}" after block)')
    return statements
  }

  expressionStatement() {
    const val = this.expression()
    this.consume(token.SEMICOLON, 'Expect ; after value.')
    return new ExpressionStatement(val)
  }

  printStatement() {
    const val = this.expression()
    this.consume(token.SEMICOLON, 'Expect ; after value.')
    return new PrintStatement(val)
  }

  matchBinary(method, Class, ...operators) {
    let expr = this[method]()
    while (this.match(...operators)) {
      const operator = this.previous()
      const right = this[method]()
      expr = new Class(expr, operator, right)
    }
    return expr
  }

  equality() {
    return this.matchBinary('comparison', Binary, token.BANG_EQUAL, token.EQUAL_EQUAL)
  }

  comparison() {
    return this.matchBinary(
      'addition',
      Binary,
      token.GREATER,
      token.GREATER_EQUAL,
      token.LESS,
      token.LESS_EQUAL
    )
  }

  addition() {
    return this.matchBinary('multiplication', Binary, token.MINUS, token.PLUS)
  }

  multiplication() {
    return this.matchBinary('unary', Binary, token.SLASH, token.STAR)
  }

  unary() {
    if (this.match(token.BANG, token.MINUS)) {
      const operator = this.previous()
      const right = this.unary()
      return new Unary(operator, right)
    }
    return this.call()
  }

  call() {
    let expr = this.primary()
    while (true) {
      if (this.match(token.LEFT_PAREN)) {
        expr = this.finishCall(expr)
      } else {
        break
      }
    }

    return expr
  }

  finishCall(callee) {
    let args = []
    if (!this.check(token.RIGHT_PAREN)) {
      do {
        args.push(this.expression())
      } while (this.match(token.COMMA))
    }
    const paren = this.consume(token.RIGHT_PAREN, 'Unfinished argument list')
    return new Call(callee, paren, args)
  }

  primary() {
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

  consume(type, err) {
    if (this.check(type)) return this.advance()

    throw ParseError(err, this.peek())
  }

  // Checks if current token is one of the following tokens and advances to next token
  match(...tokens) {
    for (let token of tokens) {
      if (this.check(token)) {
        this.advance()
        return true
      }
    }

    return false
  }

  // Verifies current token is equal to type
  check(type) {
    return !this.isAtEnd && this.peek().type === type
  }

  get isAtEnd() {
    return this.peek().type === token.EOF
  }

  // Gets current token
  peek() {
    return this.tokens[this.current]
  }

  // Gets previous token
  previous() {
    if (this.current <= 0) throw ParseError('Expected previous but found nothing', this.peek())
    return this.tokens[this.current - 1]
  }

  // Advances parser to the next token
  advance() {
    if (!this.isAtEnd) this.current++
    return this.previous()
  }
}

module.exports = Parser
