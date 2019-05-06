class Binary {
  constructor(left, operator, right) {
    this.left = left
    this.operator = operator
    this.right = right
  }
}

class Logical extends Binary {}

class Unary {
  constructor(operator, right) {
    this.operator = operator
    this.right = right
  }
}

class Literal {
  constructor(value) {
    this.value = value
  }
}

class Var {
  constructor(name) {
    this.name = name
  }
}

class Grouping {
  constructor(expression) {
    this.expression = expression
  }
}

class ExpressionStatement extends Grouping {}
class PrintStatement extends Grouping {}

class VarStatement {
  constructor(name, initializer) {
    this.name = name
    this.initializer = initializer
  }
}

class Assignment {
  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

class Block {
  constructor(statements) {
    this.statements = statements
  }
}

class Condition {
  constructor(condition, thenBranch, elseBranch) {
    this.condition = condition
    this.thenBranch = thenBranch
    this.elseBranch = elseBranch
  }
}

class While {
  constructor(condition, body) {
    this.condition = condition
    this.body = body
  }
}

class Call {
  constructor(callee, paren, args) {
    ;(this.callee = callee), (this.paren = paren)
    this.arguments = args
  }
}

class Callable {
  constructor(name, func) {
    this.lexeme = name
    this.call = func
  }

  toString() {
    return '<native fn>'
  }
}

module.exports = {
  Var,
  Binary,
  Unary,
  Block,
  Call,
  Callable,
  While,
  Literal,
  Logical,
  Grouping,
  Condition,
  ExpressionStatement,
  PrintStatement,
  VarStatement,
  Assignment
}
