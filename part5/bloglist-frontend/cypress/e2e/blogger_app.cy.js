
describe('Blogger app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'root',
      name: 'rooty',
      password: '111'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('login page loads by default', () => {
    cy.contains('Login')
    cy.contains('Submit')
  })

  describe('Logging in', () => {
    it('Log in with valid credentials', () => {
      cy.get('#username').type('root')
      cy.get('#password').type('111')
      cy.get('#submit').click()

      cy.get('.notification')
        .should('contain', 'rooty')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })
    it('Log in with invalid credentials', () => {
      cy.get('#username').type('notroot')
      cy.get('#password').type('222')
      cy.get('#submit').click()

      cy.get('.notification')
        .should('contain', 'Invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'notroot')
    })
  })

  describe('When user is logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: '111' })
    })

    it('User can create new blogs', () => {
      cy.contains('Create New Entry').click()
      cy.createRootBlog()
      cy.contains('groot is root')
    })

    it('User can like a blog', () => {
      cy.postRootBlog()
      cy.contains('Expand').click()
      cy.contains('Like').click()

      cy.get('#likesExpanded').should('contain','1')
    })
    it('User can delete own blog', () => {
      cy.postRootBlog()
      cy.contains('Expand').click()

      cy.contains('Delete').click()

      cy.get('html').should('not.contain', 'end to end testing')
    })
    it('User cannot delete other user created blogs', () => {
      cy.postRootBlog()
      cy.contains('Logout').click()

      const user = {
        username: 'jess',
        name: 'jessy',
        password: '222'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.login({ username: 'jess', password: '222' })

      cy.contains('Expand').click()
      cy.contains('Delete').click()
      cy.get('.notification')
        .should('contain', 'Cannot delete this blog, is it yours?')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('end to end testing')
    })
    it('Blogs are sorted by likes high to low', () => {
      cy.postRootBlog()

      cy.contains('Create New Entry').click()
      cy.postSecondBlog()

      cy.get('.blog').eq(0).contains('Expand').click()
      for(let i = 0; i < 2; i++){
        cy.get('.blog').eq(0).contains('Like').click()
      }
      cy.get('.blog').eq(0).contains('Expand').click()


      cy.get('.blog').eq(1).contains('Expand').click()
      for(let i = 0; i < 3; i++){
        cy.get('.blog').eq(1).contains('Like').click()
      }

      cy.get('.blog').eq(0).contains('second blog')
    })
  })

})