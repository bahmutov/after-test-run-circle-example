/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
  if (process.env.CIRCLE_BUILD_NUM) {
    // let's fail every even build
    console.log('process.env.CIRCLE_BUILD_NUM', process.env.CIRCLE_BUILD_NUM)
    config.env.shouldFail = Number(process.env.CIRCLE_BUILD_NUM) % 2 === 0
    console.log('should fail?', config.env.shouldFail)
  }

  return config
}
