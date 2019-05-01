class Binary {
  constructor (left, operator, right) {
    this.left = left
    this.operator = operator
    this.right = right
  }
}
class Unary {
  constructor (operator, right) {
    this.operator = operator
    this.right = right
  }
}

class Literal {
  constructor (value) {
    this.value = value
  }
}

class Var {
  constructor (name) {
    this.name = name
  }
}

// @TODO: Can we express this in a less type-dependant way?
class Grouping {
  constructor (expression) {
    this.expression = expression
  }
}

class ExpressionStatement extends Grouping {}
class PrintStatement extends Grouping {}

class VarStatement {
  constructor (name, initializer) {
    this.name = name
    this.initializer = initializer
  }
}

class Assignment {
  constructor (name, value) {
    this.name = name
    this.value = value
  }
}

module.exports = {
  Var,
  Binary,
  Unary,
  Literal,
  Grouping,
  ExpressionStatement,
  PrintStatement,
  VarStatement,
  Assignment
}