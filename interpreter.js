const { runtimeError } = require('./errors')
const { Binary, Unary, Literal, Var, Grouping, ExpressionStatement, VarStatement, PrintStatement } = require('./types')
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
  constructor (environment) {
    this.environment = environment || new Environment()
  }

  interpret (expr) {
    return this.evaluate(expr)
  }

  evaluate (expr) {
    if (expr instanceof PrintStatement) return this.visitPrintStatement(expr)
    else if (expr instanceof VarStatement) return this.visitVarStatement(expr)
    else if (expr instanceof Grouping) return this.visitGrouping(expr)
    else if (expr instanceof Var) return this.visitVar(expr)
    else if (expr instanceof Literal) return this.visitLiteral(expr)
    else if (expr instanceof Unary) return this.visitUnary(expr)
    else if (expr instanceof Binary) return this.visitBinary(expr)
  }

  visitLiteral (expr) { return expr.value }
  visitGrouping (expr) { return this.evaluate(expr.expression) }
  visitPrintStatement (expr) {
    const val = this.evaluate(expr.expression)
    console.log(val.toString())
    return val
  }
  visitVar (variable) {
    return this.environment.get(variable)
  }
  visitVarStatement (variable) {
    let value = null
    if (variable.initializer !== null) {
      value = this.evaluate(variable.initializer)
    }
    this.environment.set(variable.name, value)
    return null
  }

  visitUnary (expr) {
    const right = this.evaluate(expr.right)
    switch (expr.operator.type) {
      case token.MINUS:
        checkNumber(expr.operator, right)
        return -right
      case token.BANG:
        return !isTruthy(right)
    }
  }

  visitBinary (expr) {
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