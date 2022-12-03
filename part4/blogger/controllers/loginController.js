const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Users = require('../models/Users')
require('dotenv').config()


loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body

  const user = await Users.findOne({ username })
  const passwordCorrect = user === null 
    ? false
    : bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)){
    return response.status(401).json({
      error: 'username or password invalid'
    })
  }
  
  const userForToken = {
    username: username,
    id: user._id
  }
  
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(201)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter



