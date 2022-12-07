const testingRouter = require('express').Router()
const Blogs = require('../models/Blog')
const Users = require('../models/Users')
const Tokens = require('../models/Tokens')

testingRouter.post('/reset', async (request, response) => {
  await Blogs.deleteMany()
  await Users.deleteMany()
  await Tokens.deleteMany()

  response.status(204).end()
})

module.exports = testingRouter