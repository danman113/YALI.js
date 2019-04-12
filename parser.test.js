const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const token = Tokenizer.tokenEnum

const parseString = str => {
  const tokenizer = new Tokenizer(str)
  const tokens = tokenizer.scanTokens()
  const parser = new Parser(tokens)
  return parser
}

describe('Expression Parsing', () => {
  test('Parses primary characters correctly', () => {
    const primaries = [
      // Numbers
      `3`,
      `321`,
      `.3`,
      `.321`,
      `321.123`,

      // Strings
      `""`,
      `"hello"`,
      `"
        <strong>
          Independent Woman
        </strong>
      "`,
      // True
      `true`,
      // False
      `false`,
      // Nil
      `nil`
    ]
    for (let primary of primaries) {
      expect(parseString(primary).expression()).toMatchSnapshot()
    }
  })

  test('Parses unaries correctly', () => {
    const unaries = [`-3`, `!3`]
    for (const u of unaries) {
      expect(parseString(u).expression()).toMatchSnapshot()
    }
  })

  test('Parses multiplication correctly', () => {
    const mult = [
      `3 * 1`,
      `-2 * 2`,
      `-3 * -3`,
      `3 / 1`,
      `-2 / 2`,
      `-3 / -3`,
    ]
    for (const u of mult) {
      expect(parseString(u).expression()).toMatchSnapshot()
    }
  })

  test('Parses addition correctly', () => {
    const add = [
      `3 + 1`,
      `-2 + 2`,
      `-3 + -3`,
      `3 - 1`,
      `-2 - 2`,
      `-3 - -3`,
    ]
    for (const u of add) {
      expect(parseString(u).expression()).toMatchSnapshot()
    }
  })

  test('Parses comparison correctly', () => {
    const comp = [
      `3 > 1`,
      `2 < 2`,
      `3 <= 3`,
      `3 >= 1`,
    ]
    for (const u of comp) {
      expect(parseString(u).expression()).toMatchSnapshot()
    }
  })

  test('Parses equality correctly', () => {
    const equals = [
      `3 == 3`,
      `3 != 2`,
      `3 != -3`,
      `-3 != -3`,
      `!true != true`,
      `!true == !true`,
    ]
    for (const u of equals) {
      expect(parseString(u).expression()).toMatchSnapshot()
    }
  })
})