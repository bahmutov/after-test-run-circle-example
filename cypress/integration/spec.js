/// <reference types="cypress" />

// this spec might pass or fail, depending on the environment variable
it('works or fails', () => {
  cy.wait(10000) // on purpose to slow down tests
  if (Cypress.env('shouldFail') === true) {
    throw new Error('Should fail env is set!')
  }
})
