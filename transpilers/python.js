const {
  Binary,
  Unary,
  Var,
  Call,
  Literal,
  While,
  Class,
  Get,
  Set: SetExpr,
  Super,
  This,
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

const closure = variable => `closure.get("${variable}")`

const indentation = (scope, options) => options.indent.repeat(scope)

let lastSuperclass = 'super'

const ASTNodeMap = new Map()

// Declarations
ASTNodeMap.set(ExpressionStatement, (node, scope, options, initialIndent) => indentation(scope, options) + loxToPython2(node.expression, 0, options, initialIndent))

ASTNodeMap.set(PrintStatement, (node, scope, options) => indentation(scope, options) + 'print ' + loxToPython2(node.expression))

ASTNodeMap.set(Return, (node, scope, options) => {
  const retVal = `retval = ${loxToPython2(node.value)}`
  const pop = 'closure = closure.pop()'
  const ret = 'return retval'
  return [retVal, pop, ret].map(str => indentation(scope, options) + str).join('\n')
})

ASTNodeMap.set(VarStatement, (node, scope, options) => {
  // Python doesn't have plain declarations...
  const name = node.name.lexeme
  // @TODO: Work on this to handle python scoping correctly
  if (!node.initializer) return indentation(scope, options) + `closure.declare("${name}", None)`
  return indentation(scope, options) + `closure.declare("${name}", ${loxToPython2(node.initializer)})`
})

ASTNodeMap.set(Condition, ({ condition, thenBranch, elseBranch }, scope, options) => {
  const cond = loxToPython2(condition)
  const conditionSection = indentation(scope, options) + `if ${cond}:\n`
  const thenSection = loxToPython2(thenBranch, scope + 1, options, false)
  const elseSection = elseBranch && loxToPython2(elseBranch, scope + 1, options, false)
  return conditionSection + thenSection + (elseSection ? `\n${indentation(scope, options)}else:\n${elseSection}` : '')
})

const printFunction = ({ bodyStatements: body, name: { lexeme: name }, params}, scope, options, func = true) => {
  const parameters = params.map(token => token.lexeme)
  if (!func) {
    parameters.unshift('this')
    if (name === 'init') name = '__init__'
  }
  const head = indentation(scope, options) + `def ${name}(c, ${parameters.join(', ')}):`
  const env = ['global closure', 'closure = LoxEnvironment(c)'].map(str => indentation(scope + 1, options) + str)
  const arg = parameters.map(str => indentation(scope + 1, options) + `closure.declare("${str}", ${str})`)
  // Python doesn't have blank function declarations
  const fnBody = body.length > 0 ? body.map(stmt => loxToPython2(stmt, scope + 1, options)) : [indentation(scope + 1, options) + 'pass']
  const tail = func ? (indentation(scope, options) + `closure.declare("${name}", LoxFunction(${name}, closure))`) : ''
  return [head, ...env, ...arg, ...fnBody, tail].join('\n')
}

ASTNodeMap.set(LoxFunction, printFunction)

ASTNodeMap.set(While, ({ body, condition }, scope, options) => {
  const cond = loxToPython2(condition)
  const conditionSection = indentation(scope, options) + `while ${cond}:\n`
  const bodySection = loxToPython2(body, scope + 1, options, false)
  return conditionSection + bodySection
})

ASTNodeMap.set(Class, ({ name, superclass, methods }, scope, options) => {
  let superclassStr  = '()'
  if (superclass) {
    lastSuperclass = superclass.name.lexeme
    superclassStr = `(${superclass.name.lexeme})`
  }
  const className = name.lexeme
  const head = indentation(scope, options) + `class ${className}${superclassStr}:`
  let body = methods.map(node => printFunction(node, scope + 1, options, false))
  const tail = indentation(scope, options) + `closure.declare("${className}", ${className})`
  return [head, ...body, tail].join('\n')
})

ASTNodeMap.set(Get, ({ name, object }, scope, options) => {
  let nameStr = name.lexeme ? name.lexeme : loxToPython2(name, scope, options, false)
  const objectStr = loxToPython2(object, scope, options, false)
  return objectStr + '.' + nameStr
})

ASTNodeMap.set(SetExpr, ({ name, object, value }, scope, options) => {
  const nameStr = name.lexeme ? name.lexeme : loxToPython2(name, scope, options, false)
  const objectStr = loxToPython2(object, scope, options, false)
  const val = loxToPython2(value, scope, options)
  return objectStr + '.' + nameStr + ' = ' + val
})

ASTNodeMap.set(Super, ({ method: { lexeme: methodName }}) => {
  if (methodName === 'init') methodName = '__init__'
  return `${lastSuperclass}.${methodName}`
})

ASTNodeMap.set(This, ({ keyword }) => keyword.lexeme)


ASTNodeMap.set(Block, ({ statements }, scope, options, initialIndent) => {
  if (statements.length <= 0) {
    return indentation(scope, options) + 'pass'
  }
  return statements.map(stmt => loxToPython2(stmt, scope, options, initialIndent)).join('\n')
})

// Expressions
ASTNodeMap.set(Var, ({ name: { lexeme } }) => closure(lexeme))

ASTNodeMap.set(Grouping, ({ expression }) => '(' + loxToPython2(expression) + ')')


const handleBinary = node => {
  const left = loxToPython2(node.left)
  const operator = node.operator.lexeme
  const right = loxToPython2(node.right)
  return [left, operator, right].join(' ')
}

ASTNodeMap.set(Binary, handleBinary)

ASTNodeMap.set(Logical, handleBinary)

const handleUnary = unary => unary === '!' ? 'not ' : unary

ASTNodeMap.set(Unary, node => {
  const operator = handleUnary(node.operator.lexeme)
  const right = loxToPython2(node.right)
  return operator + right
})


ASTNodeMap.set(Call, node => {
  const args = node.arguments.map(args => loxToPython2(args))
  const callee = loxToPython2(node.callee)
  if (String(callee).endsWith('__init__')) args.unshift('this')
  const argsStr = args.join(', ')
  return `${callee}(${argsStr})`
})

ASTNodeMap.set(Assignment, node => {
  const name = node.name.lexeme
  const value = loxToPython2(node.value)
  return `closure.assign("${name}", ${value})`
})

const handleLiteral = value => {
  if (typeof value === 'string') {
    return `"${value}"`
  } else if (typeof value === 'boolean') {
    return value ? 'True' : 'False'
  } else if (value === null) {
    return 'None'
  } else {
    return value
  }
}

ASTNodeMap.set(Literal, ({ value }) => handleLiteral(value))

const loxToPython2 = (node, scope = 0, optionsOverride = {}) => {
  const options = Object.assign({}, {
    indent: '\t',
  }, optionsOverride)
  if (!(node instanceof Object)) return handleLiteral(node)
  if (ASTNodeMap.has(node.constructor)) {
    return ASTNodeMap.get(node.constructor)(node, scope, options)
  }
  throw new Error(`Don't support that AST node yet`, node.constructor)
}

module.exports = {
  loxToPython2
}