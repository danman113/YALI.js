const evaluate = require('./interpreter')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')

const parseExpression = code => {
  const tokenizer = new Tokenizer(code)
  const tokens = tokenizer.scanTokens()
  const parser = new Parser(tokens)
  return parser.expression()
}

describe('Interpreter', () => {
  describe('Expressions', () => {
    test('interprets literals and simple groupings correctly', () => {
      const literalMap = {
        // Numbers
        '3': 3,
        '321': 321,
        '.3': .3,
        '.321': .321,
        '(321.123)': 321.123,

        // Strings
        '""': '',
        '"hello"': 'hello',
        [
          `"
            <strong>
              Independent Woman
            </strong>
          "`
        ]: `
            <strong>
              Independent Woman
            </strong>
          `,
        // True
        'true': true,
        '(true)': true,
        // False
        'false': false,
        // Nil
        '(nil)': null
      }
      for (let literal in literalMap) {
        const value = literalMap[literal]
        expect(evaluate(parseExpression(literal))).toBe(value)
      }
    })

    test('interprets unaries correctly', () => {
      const unaryMap = {
        '-23': -23,
        '-.23': -0.23,
        '-0.52': -0.52,
        '!true': false,
        '!false': true
      }
      for (let unary in unaryMap) {
        const value = unaryMap[unary]
        expect(evaluate(parseExpression(unary))).toBe(value)
      }
    })

    test('interprets math correctly', () => {
      const math = [
        // Addition
        '1 + 1',
        '9999999999999 + 1',
        '1 + -20',
        '-20 + 5',
        '1.22 + -1.33',
        '1.11 + -4.23212321',
        '213.213 - 12314.123123',
        '1.22 + -1.33',
        '1.11 + -4.23212321',
        '213.213 + -12314.123123',
        // Subtraction
        '4 - 2',
        '1231 - 123123',
        '21312.123123 - 123123.123123',
        '.12312 - .12323',
        // Multiplication
        '1 * 1',
        '10 * 0',
        '9999 * 123812 ',
        '-10 * -20',
        '9999 * -1',
        '-12 * -23',
        // Division
        '100 / 0',
        '100 / 10',
        '3.33 / 1.11',
        '21312.312312 / 123.21312',
        // Groupings
        '(5 - (3 - 1)) + -1',
        '(5 - ((3/1) * 23)) + (12 * (2 + 1))',
      ]
      for (let eq of math) {
        expect(evaluate(parseExpression(eq))).toBe(eval(eq))
      }
    })

    test('interprets comparisons correctly', () => {
      const comparisons = [
        '3 > 2',
        '3 >= 2',
        '3 >= 3',
        '2 >= 10',
        '2 < 3',
        '3 < 2',
        '4 <= 2',
        '2 <= 4',
        '3 == 2',
        '2 == 2',
        '3 != 2',
        '2 != 2',
      ]
      for (let comp of comparisons) {
        console.log(comp)
        expect(evaluate(parseExpression(comp))).toBe(eval(comp))
      }
    })
  })
})