describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })
  /*
  it('user can login', function () {
    cy.contains('label', 'username').type('essuska')
    cy.contains('label', 'password').type('salainen')
    cy.contains('button', 'login').click()
    cy.contains('Minä logged in')
  })
  */
})