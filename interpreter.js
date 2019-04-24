const { Binary, Unary, Literal, Grouping } = require('./types')
const tokenizer = require('./tokenizer')
const token = tokenizer.tokenEnum

const isTruthy = val => Boolean(val)
const isEqual = (a, b) => a === b

const visitLiteral = expr => expr.value
const visitGrouping = expr => evaluate(expr.expression)
const visitUnary = expr => {
  const right = evaluate(expr.right)
  switch (expr.operator.type) {
    case token.MINUS:
      return -right
    case token.BANG:
      return !isTruthy(right)
  }
}

const visitBinary = expr => {
  const left = evaluate(expr.left)
  const right = evaluate(expr.right)
  switch (expr.operator.type) {
    // Math
    case token.MINUS:
      return left - right
    case token.PLUS:
      return left + right
    case token.SLASH:
      return left / right
    case token.STAR:
      return left * right
    // Comparisons
    case token.GREATER:
      return left > right
    case token.GREATER_EQUAL:
      return left >= right
    case token.LESS:
      return left < right
    case token.LESS_EQUAL:
      return left <= right
    // Equality
    case token.EQUAL_EQUAL:
      return isEqual(left, right)
    case token.BANG_EQUAL:
      return !isEqual(left, right)
  }
}


const evaluate = expr => {
  if (expr instanceof Grouping) return visitGrouping(expr)
  else if (expr instanceof Literal) return visitLiteral(expr)
  else if (expr instanceof Unary) return visitUnary(expr)
  else if (expr instanceof Binary) return visitBinary(expr)
}

module.exports = evaluate