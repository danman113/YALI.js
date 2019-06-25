import { run, parse, Environment } from './index'
import { formatLoxError } from './errors'
import { printLoxAST } from './transpilers/lox'
import { readFileSync } from 'fs'

let output = ''

const code = document.getElementById('code')

// Process Example Programs
const exampleProgramSource = [
  readFileSync(__dirname + '/examples/interactiveFibonacci.lox', 'utf-8'),
  readFileSync(__dirname + '/examples/closureLinkedList.lox', 'utf-8'),
  readFileSync(__dirname + '/examples/kitchenSink.lox', 'utf-8'),
  readFileSync(__dirname + '/examples/linkedList.lox', 'utf-8'),
  readFileSync(__dirname + '/examples/classExample.lox', 'utf-8')
]
const examplePrograms = exampleProgramSource.map(program => {
  const name = program
    .split('\n')[0]
    .replace(/[^\w\s]/gi, '')
    .trim()
  return {
    name,
    program
  }
})

const handleError = (e, source = '') => {
  if (!e) {
    document.getElementById('error').style.maxHeight = '0'
    return null
  }
  console.error(e)
  const { oneLiner, preErrorSection, errorSection, postErrorSection } = formatLoxError(e, source)
  let errorStr = oneLiner
  if (errorSection) {
    errorStr += '<br />'
    errorStr += `${preErrorSection}<span class="error">${errorSection}</span>${postErrorSection}`
  }
  document.getElementById('error').style.maxHeight = '150px'
  document.getElementById('errorText').innerHTML = errorStr
}

// Handle Example Program Dropdown
const exampleProgram = document.getElementById('exampleProgram')
const programHTML = examplePrograms
  .map((program, i) => `<option value="${i}">${program.name}</option>`)
  .join('\n')
exampleProgram.innerHTML = programHTML
exampleProgram.onchange = e => {
  const selectedProgram = e.target.value
  code.value = examplePrograms[selectedProgram].program
}

// Pick default program to load
let defaultProgram = 0
if (window.location.hash) {
  let hashValue = +window.location.hash.replace(/[^\w\s]/gi, '').trim()
  if (hashValue < exampleProgram.length) defaultProgram = hashValue
  exampleProgram.value = defaultProgram
}
code.value = examplePrograms[defaultProgram].program

// Handle running the code
const handleOutput = txt => {
  output += txt + '\n'
  console.log(txt)
  document.getElementById('output').value = output
}

const button = document.getElementById('run')
button.onclick = () => {
  const source = code.value
  const browserEnv = new Environment()
  browserEnv.setBuiltin('alert', (_, arg) => alert(arg[0]))
  browserEnv.setBuiltin('printFunctionBody', (_, arg) => {
    const fn = arg[0]
    if (fn && !fn.declaration) {
      throw new Error('Argument is not a lox function')
    }
    return printLoxAST(fn.declaration)
  })
  browserEnv.setBuiltin('confirm', (_, elem) => confirm(elem[0]))
  browserEnv.setBuiltin('prompt', (_, p) => prompt(p[0], p.length > 1 ? p[1] : null))
  output = ''
  try {
    run(source, browserEnv, handleOutput)
    handleError(null)
  } catch (e) {
    handleError(e, source)
  }
}

const formatButton = document.getElementById('format')
formatButton.onclick = () => {
  try {
    const ast = parse(code.value)
    global.ast = ast
    // console.log(ast.map(stmt => printLoxAST(stmt)).join('\n'))
    code.value = ast.map(stmt => printLoxAST(stmt)).join('\n')
    handleError(null)
  } catch (e) {
    handleError(e, code.value)
  }
}
