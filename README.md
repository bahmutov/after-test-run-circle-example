# after-test-run-circle-example [![CircleCI](https://circleci.com/gh/bahmutov/after-test-run-circle-example/tree/master.svg?style=svg)](https://circleci.com/gh/bahmutov/after-test-run-circle-example/tree/master)

CircleCI will fail every build with even build number, see [cypress/plugins/index.js](cypress/plugins/index.js)

The CircleCI workflow in [circle.yml](circle.yml) runs all the tests using [ci.js](ci.js) script file, then saves test results as a JSON file.

```json
{
  "totalDuration": 20,
  "totalSuites": 0,
  "totalTests": 1,
  "totalFailed": 0,
  "totalPassed": 1,
  "totalPending": 0,
  "totalSkipped": 0
}
```

This file is passed via CircleCI workspace to the next jobs. Then two jobs kick off - `tests-passed` and `tests-failed`. Each job grabs the test results from the file by using [tests-passed.js](tests-passed.js). If the tests passed, then `tests-passed` job continues. Otherwise is halts likes this:

```yaml
jobs
  tests-passed:
    # job will always execute, but will halt if the
    # test results say "failed"
    executor: cypress/base-10
    steps:
      - attach_workspace:
          at: ~/
      - run: ls -la
      - run: cat test-results.json
      - run: |
          if ! node ./tests-passed; then
            echo "Tests failed, halting"
            circleci-agent step halt
          fi
      - run: echo "Doing whatever is needed on success"
```

Similarly, `tests-failed` checks the results and halts itself if the tests passed.
