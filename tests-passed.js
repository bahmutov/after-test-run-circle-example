// loads all test results JSON files that match a glob pattern
// if there are not files - exits with 101
// if there is at least 1 JSON file with failed tests - exits with 1
// if all JSON files have all passing tests - exits with 0
const fs = require('fs')
const path = require('path')
const globby = require('globby')

const findMask = 'test-results-*.json'
globby(findMask).then(files => {
  console.log('found files using mas "%s"', findMask)
  console.log(files.join('\n'))

  if (!files.length) {
    console.error('Could not find any test results')
    process.exit(101)
  }

  files.forEach((filename => {
    console.log('checking file %s to see if tests succeeded', filename)
    // any error thrown means the tests failed
    const results = JSON.parse(fs.readFileSync(filename, 'utf8'))
    if (results.totalFailed !== 0) {
      console.error(`Test results have total failed !== 0, but ${results.totalFailed}`)
      process.exit(1)
    }
    console.log('tests passed')
  }))
})

