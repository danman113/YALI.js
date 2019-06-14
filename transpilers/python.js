const {
  Binary,
  Unary,
  Var,
  Call,
  Literal,
  While,
  // @TODO: Support Classes
  // Class,
  // Get,
  // Set,
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
} = require('../types')

// const condChar = (condition, replacer = ' ') => condition ? replacer : ''
const indentation = (scope, options) => options.indent.repeat(scope)

const ASTNodeMap = new Map()

// Declarations
ASTNodeMap.set(ExpressionStatement, (node, scope, options, initialIndent) => indentation(scope, options) + loxToPython2(node.expression, 0, options, initialIndent))

ASTNodeMap.set(PrintStatement, (node, scope, options) => indentation(scope, options) + 'print ' + loxToPython2(node.expression))

ASTNodeMap.set(Return, (node, scope, options) => indentation(scope, options) + 'return ' + loxToPython2(node.value))

ASTNodeMap.set(VarStatement, (node, scope, options) => {
  // Python doesn't have plain declarations...
  if (!node.initializer) return ''
  const name = node.name.lexeme
  return indentation(scope, options) + `${name} = ${loxToPython2(node.initializer)}`
})

ASTNodeMap.set(Condition, ({ condition, thenBranch, elseBranch }, scope, options) => {
  const cond = loxToPython2(condition)
  const conditionSection = indentation(scope, options) + `if ${cond}:\n`
  const thenSection = loxToPython2(thenBranch, scope + 1, options, false)
  const elseSection = elseBranch && loxToPython2(elseBranch, scope + 1, options, false)
  return conditionSection + thenSection + (elseSection ? `\n${indentation(scope, options)}else:\n${elseSection}` : '')
})

ASTNodeMap.set(LoxFunction, ({ bodyStatements: body, name: { lexeme: name }, params}, scope, options) => {
  const parameters = params.map(token => token.lexeme)
  const head = indentation(scope, options) + `def ${name}(${parameters.join(', ')}):`
  // Python doesn't have blank function declarations
  const fnBody = body.length > 0 ? body.map(stmt => loxToPython2(stmt, scope + 1, options)) : [indentation(scope + 1, options) + 'pass']
  return [head, ...fnBody].join('\n')
})

ASTNodeMap.set(While, ({ body, condition }, scope, options) => {
  const cond = loxToPython2(condition)
  const conditionSection = indentation(scope, options) + `while ${cond}:\n`
  const bodySection = loxToPython2(body, scope + 1, options, false)
  return conditionSection + bodySection
})

ASTNodeMap.set(Block, ({ statements }, scope, options, initialIndent) => statements.map(stmt => loxToPython2(stmt, scope, options, initialIndent)).join('\n'))

// Expressions
ASTNodeMap.set(Var, ({ name: { lexeme } }) => lexeme)

ASTNodeMap.set(Grouping, ({ expression }) => '(' + loxToPython2(expression) + ')')


const handleBinary = node => {
  const left = loxToPython2(node.left)
  const operator = node.operator.lexeme
  const right = loxToPython2(node.right)
  return [left, operator, right].join(' ')
}

ASTNodeMap.set(Binary, handleBinary)

ASTNodeMap.set(Logical, handleBinary)

ASTNodeMap.set(Unary, node => {
  const operator = node.operator.lexeme
  const right = loxToPython2(node.right)
  return operator + right
})


ASTNodeMap.set(Call, node => {
  const args = node.arguments.map(args => loxToPython2(args)).join(', ')
  const callee = loxToPython2(node.callee)
  return `${callee}(${args})`
})

ASTNodeMap.set(Assignment, node => {
  const name = node.name.lexeme
  const value = loxToPython2(node.value)
  return name + ' = ' + value
})

ASTNodeMap.set(Literal, ({ value }) => {
  if (typeof value === 'string') {
    return `"${value}"`
  } else if (value === null) {
    return 'None'
  } else {
    return value
  }
})

const loxToPython2 = (node, scope = 0, optionsOverride = {}) => {
  const options = Object.assign({}, {
    indent: '\t',
  }, optionsOverride)

  if (ASTNodeMap.has(node.constructor)) {
    return ASTNodeMap.get(node.constructor)(node, scope, options)
  }
  throw new Error(`Don't support classes yet`, node.constructor)
}

module.exports = {
  loxToPython2
}