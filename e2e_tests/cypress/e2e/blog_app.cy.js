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
      cy.contains('label', 'password').type('salainen')
      cy.contains('button', 'login').click()
      cy.contains('wrong username or password')

      cy.contains('label', 'username').type('essuska')
      cy.contains('label', 'password').type('salaine')
      cy.contains('button', 'login').click()
      cy.contains('wrong username or password')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'essuska', password: 'salainen' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.contains('label', 'title').type('New blog title')
        cy.contains('label', 'author').type('New Author')
        cy.contains('label', 'url').type('newblog.fi')
        cy.get('button').contains('create').click()

        cy.contains('blog New blog title by author New Author was successfully added.')
        cy.get('.blog').contains('New blog title')
      })
    })
  })
})