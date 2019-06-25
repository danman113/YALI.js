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

const condChar = (condition, replacer = ' ') => condition ? replacer : ''

const ASTNodeMap = new Map()

// Declarations
ASTNodeMap.set(ExpressionStatement, (node, scope, options) => printLoxAST(node.expression, 0, options) + (node.context === 'forLoop' ? '' : ';'))

ASTNodeMap.set(PrintStatement, node => 'print ' + printLoxAST(node.expression) + ';')

ASTNodeMap.set(Return, node => 'return ' + printLoxAST(node.value) + ';')

ASTNodeMap.set(VarStatement, node => {
  const name = node.name.lexeme
  const initializer = node.initializer ? printLoxAST(node.initializer) : null
  return `var ${name}` + (initializer ? ` = ${initializer}` : '') + ';'
})

ASTNodeMap.set(Condition, ({ condition, thenBranch, elseBranch }, scope, options) => {
  const cond = printLoxAST(condition)
  const conditionSection = `if${condChar(options.spaceBeforeParams)}(${cond}) `
  const thenSection = printLoxAST(thenBranch, scope, options, false)
  const elseSection = elseBranch && printLoxAST(elseBranch, scope, options, false)
  return conditionSection + thenSection + (elseSection ? ` else ${elseSection}` : '')
})

const printFunction = ({ bodyStatements: body, name: { lexeme: name }, params}, scope, options, func = true) => {
  const parameters = params.map(token => token.lexeme)
  const id = func ? 'fun ' : ''
  const head = id + `${name}${condChar(options.spaceBeforeParams)}(${parameters.join(', ')}) {`
  const fnBody = body.map(stmt => printLoxAST(stmt, scope + 1, options))
  const tail = options.indent.repeat(scope) + '}' + condChar(options.functionNewlines, '\n')
  return [head, ...fnBody, tail].join('\n')
}

ASTNodeMap.set(LoxFunction, printFunction)

const handleWhileLoop = ({ body, condition }, scope, options) => {
  const cond = printLoxAST(condition)
  const conditionSection = `while${condChar(options.spaceBeforeParams)}(${cond}) `
  const bodySection = printLoxAST(body, scope, options, false)
  return conditionSection + bodySection
}

const whileForLoop = ({ body, condition }, scope, options, initializer = ';') => {
  const cond = condition.context !== 'forLoop' ? printLoxAST(condition) : ''
  let inc = ''
  let realBody = body
  if (body instanceof Block && body.context === 'forLoop') {
    const { statements } = body
    realBody = statements[0]
    if (statements.length > 1) {
      inc = printLoxAST(statements[statements.length - 1], scope, options, false)
    }
  }
  const bodySection = printLoxAST(realBody, scope, options, false)
  const steps = [cond, inc]
  return `for${condChar(options.spaceBeforeParams)}(${initializer} ${steps.join('; ')}) ${bodySection}`
}

ASTNodeMap.set(While, (node, scope, options) => {
  if (node.context === 'forLoop') {
    return whileForLoop(node, scope, options)
  } else {
    return handleWhileLoop(node, scope, options)
  }
})

ASTNodeMap.set(Class, ({ name, superclass, methods }, scope, options) => {
  let superclassStr  = ''
  if (superclass) {
    const superClassName = superclass.name.lexeme
    superclassStr = ` < ${superClassName}`
  }
  const head = `class ${name.lexeme}${superclassStr} {`
  const tail = options.indent.repeat(scope) + '}'
  let body = methods.map(node => options.indent.repeat(scope + 1) + printFunction(node, scope + 1, options, false))
  return [head, ...body, tail].join('\n')
})

ASTNodeMap.set(Get, ({ name, object }, scope, options) => {
  const nameStr = name.lexeme ? name.lexeme : printLoxAST(name, scope, options, false)
  const objectStr = printLoxAST(object, scope, options, false)
  return objectStr + '.' + nameStr
})

ASTNodeMap.set(SetExpr, ({ name, object, value }, scope, options) => {
  const nameStr = name.lexeme ? name.lexeme : printLoxAST(name, scope, options, false)
  const objectStr = printLoxAST(object, scope, options, false)
  const val = printLoxAST(value, scope, options)
  return objectStr + '.' + nameStr + ' = ' + val
})

ASTNodeMap.set(Super, ({ method: { lexeme: methodName }}) => {
  return `super.${methodName}`
})

ASTNodeMap.set(This, ({ keyword }) => keyword.lexeme)

const blockForLoop = ({ statements }, scope, options) => {
  const iter = printLoxAST(statements[0], scope, options, false)
  return whileForLoop(statements[1], scope, options, iter)
}

const printBlock = ({ statements }, scope, options) =>
  '{\n' +
  statements.map(stmt => printLoxAST(stmt, scope + 1, options)).join('\n') +
  `\n${options.indent.repeat(scope)}}`

ASTNodeMap.set(Block, (node, scope, options) => {
  if (node.context === 'forLoop') {
    return blockForLoop(node, scope, options)
  } else {
    return printBlock(node, scope, options)
  }
})

// Expressions
ASTNodeMap.set(Var, ({ name: { lexeme } }) => lexeme)

ASTNodeMap.set(Grouping, ({ expression }) => '(' + printLoxAST(expression) + ')')


const handleBinary = node => {
  const left = printLoxAST(node.left)
  const operator = node.operator.lexeme
  const right = printLoxAST(node.right)
  return [left, operator, right].join(' ')
}

ASTNodeMap.set(Binary, handleBinary)

ASTNodeMap.set(Logical, handleBinary)

ASTNodeMap.set(Unary, node => {
  const operator = node.operator.lexeme
  const right = printLoxAST(node.right)
  return operator + right
})


ASTNodeMap.set(Call, node => {
  const args = node.arguments.map(args => printLoxAST(args)).join(', ')
  const callee = printLoxAST(node.callee)
  return `${callee}(${args})`
})

ASTNodeMap.set(Assignment, node => {
  const name = node.name.lexeme
  const value = printLoxAST(node.value)
  return name + ' = ' + value
})

ASTNodeMap.set(Literal, ({ value }) => {
  if (typeof value === 'string') {
    return `"${value}"`
  } else if (value === null) {
    return 'nil'
  } else {
    return value
  }
})

const printLoxAST = (node, scope = 0, optionsOverride = {}, initialIndent = true) => {
  const options = Object.assign({}, {
    indent: '\t',
    spaceBeforeParams: true,
    functionNewlines: true
  }, optionsOverride)

  if (ASTNodeMap.has(node.constructor)) {
    const indentation = (initialIndent ? options.indent.repeat(scope) : '')
    return indentation + ASTNodeMap.get(node.constructor)(node, scope, options)
  }
  // throw new Error(`Don't support classes yet`)
}

module.exports = {
  printLoxAST
}