const { Interpreter } = require('./interpreter')
const Tokenizer = require('./tokenizer')
const Parser = require('./parser')

const parseExpression = code => {
  const tokenizer = new Tokenizer(code)
  const tokens = tokenizer.scanTokens()
  const parser = new Parser(tokens)
  return parser.expression()
}

const parseStatements = code => {
  const tokenizer = new Tokenizer(code)
  const tokens = tokenizer.scanTokens()
  const parser = new Parser(tokens)
  return parser.parse()
}

describe('Interpreter', () => {
  describe('Expressions', () => {
    let interpreter

    beforeEach(() => {
      interpreter = new Interpreter()
    })
    test('interprets literals and simple groupings correctly', () => {
      const literalMap = {
        // Numbers
        '3': 3,
        '321': 321,
        '.3': 0.3,
        '.321': 0.321,
        '(321.123)': 321.123,

        // Strings
        '""': '',
        '"hello"': 'hello',
        [`"
            <strong>
              Independent Woman
            </strong>
          "`]: `
            <strong>
              Independent Woman
            </strong>
          `,
        // True
        true: true,
        '(true)': true,
        // False
        false: false,
        // Nil
        '(nil)': null
      }
      for (let literal in literalMap) {
        const value = literalMap[literal]
        const interpreter = new Interpreter()
        expect(interpreter.interpret(parseExpression(literal))).toBe(value)
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
        expect(interpreter.interpret(parseExpression(unary))).toBe(value)
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
        '(5 - ((3/1) * 23)) + (12 * (2 + 1))'
      ]
      for (let eq of math) {
        expect(interpreter.interpret(parseExpression(eq))).toBe(eval(eq))
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
        '2 != 2'
      ]
      for (let comp of comparisons) {
        expect(interpreter.interpret(parseExpression(comp))).toBe(eval(comp))
      }
    })

    test('catches basic binary type errors', () => {
      const comparisons = [['2', '"hello"'], ['false', '"hello"']]
      const operators = ['-', '*', '/', '>', '>=', '<', '<=']
      for (let operator of operators) {
        for (let comparison of comparisons) {
          const [left, right] = comparison
          const stmt1 = left + operator + right
          const stmt2 = right + operator + left
          expect(() => {
            interpreter.interpret(parseExpression(stmt1))
          }).toThrow('Operand must be a number!')
          expect(() => {
            interpreter.interpret(parseExpression(stmt2))
          }).toThrow('Operand must be a number!')
        }
      }
    })

    test('handles variables and lexical scoping', () => {
      const long = `
        var a = "global a";
        var b = "global b";
        var c = "global c";
        {
          var a = "outer a";
          var b = "outer b";
          {
            var a = "inner a";
            print a;
            print b;
            print c;
          }
          print a;
          print b;
          print c;
        }
        print a;
        print b;
        print c;
      `

      const statements = parseStatements(long)
      const values = []
      for (let stmt of statements) {
        values.push(interpreter.interpret(stmt))
      }

      expect(values).toEqual([null, null, null, null, 'global a', 'global b', 'global c'])
    })
  })
})
