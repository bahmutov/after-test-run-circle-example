const fs = require('fs')
const path = require('path')
const globby = require('globby')

globby('test-results-*.json').then(files => {
  console.log('found files')
  console.log(files.join('\n'))

  files.forEach((filename => {
    console.log('checking file %s to see if tests succeeded', filename)
    // any error thrown means the tests failed
    const results = JSON.parse(fs.readFileSync(filename, 'utf8'))
    if (results.totalFailed !== 0) {
      throw new Error(`Test results have total failed !== 0, but ${results.totalFailed}`)
    }
    console.log('tests passed')
  }))
})

