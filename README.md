# YALI.js
### Yet Another Lox Interpreter. Javascript Implementation

Lox is a Dynamically Typed Programming Language created by [Bob Nystrom](https://twitter.com/intent/user?screen_name=munificentbob) for his excellent book [Crafting Interpreters](https://craftinginterpreters.com).

This is yet another Javascript Implementation.

## [Try it out in the Playground!](https://danman113.github.io/YALI.js/)


## Installation

```bash
$ npm install yali.js
```

## CLI Usage

### File
```bash
$ yali loxfile.lox
```

### REPL
```bash
$ yali
> print "No semicolons needed!"
```

### loxfmt
```bash
$ loxfmt --write --indent="  " loxfile.lox
```

### lox2python
```bash
$ lox2python loxfile.lox --out="a.py"
```
**OR**
```bash
$ lox2python loxfile.lox | python
```

## Embedding in your JS App
The main interface of YALI.js is a `run` method that will tokenize, parse, and interpret your lox source code, all in one function.
```javascript
run(source_code, environment = new Environment(), printfn = console.log, debug = false)
```

You can pass in an `environment` object, which lets you define built-in variables and functions like so:
```javascript
const { run, Environment } = require('yali')
const env = new Environment()
env.setBuiltin('owner', 'dberezin')
env.setBuiltin('meaning_of_life', 42)
env.setBuiltin('alert', (interpreter, arg) => alert(arg[0]))
```

You can also pass in a `printfn` that will be called for every `print` statement. Here's an example for capitalizing each word in the stdout:
```javascript
run(
  'print "hello world";',
  new Environment(),
  out => console.log(out.split(' ').map(_.capitalize).join(' '))
)
> Hello World
```

## Parsing
YALI.js also provides a `parse` function to tokenize and parse lox source code, returning an array of AST nodes that can be manipulated as desired. See any of the [transpiler examples](./transpilers/python) for reference.


## Contribute

For any bugs and feature requests please [open an issue](https://github.com/danman113/YALI.js/issues). For code contributions please create a [pull request](https://github.com/danman113/YALI.js/pulls). Enjoy!

