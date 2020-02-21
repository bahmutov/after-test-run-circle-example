const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, 'test-results.json')

console.log('checking file %s to see if tests succeeded', filename)
// any error thrown means the tests failed
const results = JSON.parse(fs.readFileSync(filename, 'utf8'))
if (results.totalFailed !== 0) {
  throw new Error(`Test results have total failed !== 0, but ${results.totalFailed}`)
}
