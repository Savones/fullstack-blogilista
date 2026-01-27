describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Minä',
      username: 'essuska',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('label', 'username').type('essuska')
      cy.contains('label', 'password').type('salainen')
      cy.contains('button', 'login').click()
      cy.contains('Minä logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('label', 'username').type('essusk')
      cy.contains('label', 'password').type('salaine')
      cy.contains('button', 'login').click()
      cy.contains('wrong username or password')
    })
  })
})