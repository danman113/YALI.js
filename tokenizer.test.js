const Tokenizer = require('./tokenizer')

describe('Tokenizer', () => {
  test('Tokenizer basically works', () => {
    const tokenizer = new Tokenizer(`
    // Lol comments
    ( ) >= <= == = > < {
      // Number time
      20;
      10000;
      .2000;
      23.001;

      // String time
      "
      hello this is a string
      <hello>
        JSX BABY
      </hello>
      "

      // Keywords baby
      and
      class
      else
      false
      for
      fun
      if
      nil
      or
      print
      return
      super
      this
      true
      var
      while

      // Idents
      hello here is a bunch of silly idents
      object.method()
    }
    `)
    const tokens = tokenizer.scanTokens()
    expect(tokens).toMatchSnapshot()
  })

  test('Handles unfinished strings', () => {
      let tokenizer = new Tokenizer(`var str = "hello this is an unfinished str-`)
      expect(() => tokenizer.scanTokens()).toThrow(/Unfinished string/)

      tokenizer = new Tokenizer(`var str = "hello this is an finished string"`)
      expect(() => tokenizer.scanTokens()).not.toThrow(/Unfinished string/)

      tokenizer = new Tokenizer(`
        var str = "hello this is an finished string"
        "oh god not another unfinished str-
      `)
      expect(() => tokenizer.scanTokens()).toThrow(/Unfinished string/)
  })

  test('Handles unexpected characters', () => {
    const unexpectedCharacters = ['🐕', '✋🏽', '⽷']
    for (let char of unexpectedCharacters) {
      let tokenizer = new Tokenizer(`var ${char} = "dog"`)
      expect(() => tokenizer.scanTokens()).toThrow(/Unexpected character/)
    }
  })

  test('Handles unexpected characters in strings', () => {
    const unexpectedCharacters = ['🐕', '✋🏽', '⽷']
    for (let char of unexpectedCharacters) {
      let tokenizer = new Tokenizer(`var dog = "${char}"`)
      expect(() => tokenizer.scanTokens()).not.toThrow(/Unexpected character/)
    }
  })

  test('Returns correct line number when handling unfinished strings', () => {
    const singleLine = 'var string = "would suck if something happened to m-'
    try {
      let tokenizer = new Tokenizer(singleLine)
      tokenizer.scanTokens()
    } catch (e) {
      expect(e.toString()).toBe('Unfinished string')
      expect(singleLine.substr(e.startCoordinates.index, e.endCoordinates.index)).toBe('"would suck if something happened to m-')
      expect(e.startCoordinates.line).toBe(1)
      expect(e.endCoordinates.line).toBe(1)
    }

    const multiline = `
      var str = "<strong>
        I am a strong dude
      </strong>`
    try {
      let tokenizer = new Tokenizer(multiline)
      tokenizer.scanTokens()
    } catch (e) {
      expect(e.toString()).toBe('Unfinished string')
      expect(multiline.substr(e.startCoordinates.index, e.endCoordinates.index)).toMatchSnapshot()
      expect(e.startCoordinates.line).toBe(2)
      expect(e.endCoordinates.line).toBe(4)
    }
  })

  test('Returns correct line number when handling unexpected characters', () => {
    const unexpectedCharacters = ['🐕', 'var a = 🐕', `
      var cat = "cat"
      var dog = 🐕
    `]
    for (let char of unexpectedCharacters) {
      try {
        let tokenizer = new Tokenizer(char)
        tokenizer.scanTokens()
      } catch (e) {
        expect(e.toString()).toMatch(/Unexpected character/)
        expect(e.startCoordinates).toMatchSnapshot()
        expect(e.endCoordinates).toMatchSnapshot()
      }
    }
  })
})