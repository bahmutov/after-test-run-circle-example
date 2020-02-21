const cypress = require('cypress')
const fs = require('fs')
const path = require('path')

// record on the Dashboard if running on CI
// when running locally, don't record
const record = process.env.CI ? true : false
cypress.run({
  record,
  video: false
}).then(results => {
  const filename = path.join(__dirname, 'test-results.json')
  fs.writeFileSync(filename, JSON.stringify(results, null, 2) + '\n', 'utf8')
  console.log('saved test results to %s', filename)
})
