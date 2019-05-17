import { run, Environment } from './index'
import { readFileSync } from 'fs'

const code = document.getElementById('code')

const exampleProgramSource = [
  readFileSync(__dirname + '/examples/interactiveFibonacci.lox', 'utf-8'),
  readFileSync(__dirname + '/examples/closureLinkedList.lox', 'utf-8')
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

const exampleProgram = document.getElementById('exampleProgram')
const programHTML = examplePrograms
  .map((program, i) => `<option value="${i}">${program.name}</option>`)
  .join('\n')
exampleProgram.innerHTML = programHTML
exampleProgram.onchange = e => {
  const selectedProgram = e.target.value
  code.value = examplePrograms[selectedProgram].program
}
code.value = examplePrograms[0].program

const button = document.getElementById('run')
button.onclick = () => {
  const source = code.value
  const browserEnv = new Environment()
  browserEnv.setBuiltin('alert', (_, arg) => alert(arg[0]))
  browserEnv.setBuiltin('confirm', (_, elem) => confirm(elem[0]))
  browserEnv.setBuiltin('prompt', (_, p) => prompt(p[0], p.length > 1 ? p[1] : null))
  run(source, browserEnv)
}
