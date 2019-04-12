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

// @TODO: Can we express this in a less type-dependant way?
class Grouping {
  constructor (expression) {
    this.expression = expression
  }
}

module.exports = {
  Binary,
  Unary,
  Literal,
  Grouping
}