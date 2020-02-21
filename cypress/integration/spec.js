it('works or fails', () => {
  if (Cypress.env('shouldFail') === true) {
    throw new Error('Should fail env is set!')
  }
})
