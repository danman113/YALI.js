const { runtimeError } = require('./errors')
const {
  Binary,
  Unary,
  Literal,
  Var,
  Grouping,
  Block,
  ExpressionStatement,
  VarStatement,
  PrintStatement,
  Assignment,
  Condition
} = require('./types')
const Environment = require('./environment')
const tokenizer = require('./tokenizer')
const token = tokenizer.tokenEnum

const isTruthy = val => Boolean(val)
const isEqual = (a, b) => a === b
const checkNumber = (token, ...operands) => {
  for (let operand of operands) {
    if (isNaN(operand)) {
      throw runtimeError('Operand must be a number!', token)
    }
  }
}

class Interpreter {
  constructor(environment) {
    this.environment = environment || new Environment()
  }

  interpret(expr) {
    return this.evaluate(expr)
  }

  evaluate(expr) {
    if (expr instanceof Block) return this.visitBlock(expr)
    else if (expr instanceof Assignment) return this.visitAssignment(expr)
    else if (expr instanceof Condition) return this.visitCondition(expr)
    else if (expr instanceof VarStatement) return this.visitVarStatement(expr)
    else if (expr instanceof PrintStatement) return this.visitPrintStatement(expr)
    // Doesn't need it's own, it can just evaluate like grouping
    else if (expr instanceof ExpressionStatement) return this.visitGrouping(expr)
    else if (expr instanceof Grouping) return this.visitGrouping(expr)
    else if (expr instanceof Var) return this.visitVar(expr)
    else if (expr instanceof Literal) return this.visitLiteral(expr)
    else if (expr instanceof Unary) return this.visitUnary(expr)
    else if (expr instanceof Binary) return this.visitBinary(expr)
  }

  visitLiteral(expr) {
    return expr.value
  }
  visitGrouping(expr) {
    return this.evaluate(expr.expression)
  }
  visitPrintStatement(expr) {
    const val = this.evaluate(expr.expression)
    console.log(!val ? 'nil' : val.toString())
    return val
  }
  visitVar(variable) {
    return this.environment.get(variable)
  }
  visitVarStatement(variable) {
    let value = null
    if (variable.initializer !== null) {
      value = this.evaluate(variable.initializer)
    }
    this.environment.set(variable.name, value)
    return null
  }

  visitBlock(expr) {
    this.interpretBlock(expr.statements, new Environment(this.environment))
    return null
  }

  visitCondition(expr) {
    if (isTruthy(this.evaluate(expr.condition))) {
      this.evaluate(expr.thenBranch)
    } else if (expr.elseBranch) {
      this.evaluate(expr.elseBranch)
    }
    return null
  }

  interpretBlock(statements, env) {
    const prevEnvironment = this.environment
    try {
      this.environment = env
      for (let stmt of statements) {
        this.interpret(stmt)
      }
      this.environment = prevEnvironment
    } catch (e) {
      this.environment = prevEnvironment
      throw e
    }
  }

  visitAssignment(expr) {
    const value = this.evaluate(expr.value)
    this.environment.assign(expr.name, value)
    return value
  }

  visitUnary(expr) {
    const right = this.evaluate(expr.right)
    switch (expr.operator.type) {
      case token.MINUS:
        checkNumber(expr.operator, right)
        return -right
      case token.BANG:
        return !isTruthy(right)
    }
  }

  visitBinary(expr) {
    const left = this.evaluate(expr.left)
    const right = this.evaluate(expr.right)
    switch (expr.operator.type) {
      // Math
      case token.MINUS:
        checkNumber(expr.operator, right, left)
        return left - right
      case token.PLUS:
        return left + right
      case token.SLASH:
        checkNumber(expr.operator, right, left)
        return left / right
      case token.STAR:
        checkNumber(expr.operator, right, left)
        return left * right
      // Comparisons
      case token.GREATER:
        checkNumber(expr.operator, right, left)
        return left > right
      case token.GREATER_EQUAL:
        checkNumber(expr.operator, right, left)
        return left >= right
      case token.LESS:
        checkNumber(expr.operator, right, left)
        return left < right
      case token.LESS_EQUAL:
        checkNumber(expr.operator, right, left)
        return left <= right
      // Equality
      case token.EQUAL_EQUAL:
        return isEqual(left, right)
      case token.BANG_EQUAL:
        return !isEqual(left, right)
    }
  }
}

module.exports = Interpreter
