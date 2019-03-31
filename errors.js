const error = (msg, line) =>
  new Error(`${line}: ${msg}`)
module.exports = {
  error
}