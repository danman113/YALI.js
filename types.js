const Binary = (left, operator, right) => ({
  left, operator, right
})

const Unary = (operator, right) => ({
  operator, right
})

const Literal = (value) => ({
  value
})

// @TODO: Can we express this in a less type-dependant way?
const Grouping = (expression) => ({
  expression
})

module.exports = {
  Binary,
  Unary,
  Literal,
  Grouping
}