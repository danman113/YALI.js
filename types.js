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
  constructor(value, context = 'regular') {
    this.context = context
    this.value = value
  }
}

class Var {
  constructor(name) {
    this.name = name
  }
}

class Get {
  constructor(object, name) {
    this.object = object
    this.name = name
  }
}

class Set {
  constructor(object, name, value) {
    this.object = object
    this.name = name
    this.value = value
  }
}

class Grouping {
  constructor(expression) {
    this.expression = expression
  }
}

class ExpressionStatement extends Grouping {
  constructor(expression, context = 'regular') {
    super(expression)
    this.context = context
  }
}
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
  constructor(statements, context = 'regular') {
    this.context = context
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
  constructor(condition, body, context = 'while') {
    this.context = context
    this.condition = condition
    this.body = body
  }
}

class Call {
  constructor(callee, paren, args) {
    this.callee = callee
    this.paren = paren
    this.arguments = args
  }
}

class Return {
  constructor(keyword, value) {
    this.keyword = keyword
    this.value = value
  }
}

class This {
  constructor(keyword) {
    this.keyword = keyword
  }
}

class Class {
  constructor(name, methods) {
    this.name = name
    this.methods = methods
  }
}

class LoxFunction {
  constructor(name, params, bodyStatements) {
    this.name = name
    this.params = params
    this.bodyStatements = bodyStatements
  }
}

module.exports = {
  Var,
  Binary,
  Unary,
  Block,
  Call,
  While,
  Class,
  Get,
  Set,
  Literal,
  Return,
  Logical,
  This,
  LoxFunction,
  Grouping,
  Condition,
  ExpressionStatement,
  PrintStatement,
  VarStatement,
  Assignment
}
