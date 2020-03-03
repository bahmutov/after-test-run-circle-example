// Cypress NPM module API
// https://on.cypress.io/module-api
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
  // only keep properties that start with "total"
  const filtered = {}
  Object.keys(results).filter(key => key.startsWith('total')).forEach((key) => {
    filtered[key] = results[key]
  })
  return filtered
}).then(results => {
  console.log('%o', results)

  const ciBuildIndex = process.env.CIRCLE_NODE_INDEX || '-default'
  const filename = path.join(__dirname, `test-results-${ciBuildIndex}.json`)
  fs.writeFileSync(filename, JSON.stringify(results, null, 2) + '\n', 'utf8')
  console.log('saved test results to %s', filename)
})
