import { run, Environment } from './index'

const button = document.getElementById('run')
button.onclick = () => {
  const code = document.getElementById('code').value
  const browserEnv = new Environment()
  browserEnv.setBuiltin('alert', (_, arg) => alert(arg[0]))
  browserEnv.setBuiltin('confirm', (_, elem) => confirm(elem[0]))
  browserEnv.setBuiltin('prompt', (_, p) => prompt(p[0], p.length > 1 ? p[1] : null))
  run(code, browserEnv)
}
