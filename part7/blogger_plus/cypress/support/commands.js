Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((res) => {
    window.localStorage.setItem('user', JSON.stringify(res.body.userAuth.user))
    window.localStorage.setItem('userName', JSON.stringify(res.body.name))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createRootBlog', () => {
  cy.get('#title').type('end to end testing')
  cy.get('#author').type('groot is root')
  cy.get('#url').type('root.com')
  cy.get('#submit').click()
})

Cypress.Commands.add('postRootBlog', () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  cy.request('GET', `http://localhost:3001/api/auth/${user}`).then((res) => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/blogs',
      body: {
        title: 'end to end testing',
        author: 'groot is root',
        url: 'root.com',
      },
      headers: {
        Authorization: `Bearer ${res.body}`,
      },
    })
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('postSecondBlog', () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  cy.request('GET', `http://localhost:3001/api/auth/${user}`).then((res) => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/blogs',
      body: {
        title: 'second blog',
        author: 'groot is root',
        url: 'root.com',
      },
      headers: {
        Authorization: `Bearer ${res.body}`,
      },
    })
  })
  cy.visit('http://localhost:3000')
})
