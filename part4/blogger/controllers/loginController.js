const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Users = require('../models/Users')
const Tokens = require('../models/Tokens')
require('dotenv').config()


loginRouter.post('/', async (request, response, next) => {
  const {username, password} = request.body
  const user = await Users.findOne({ username })
  const passwordCorrect = user === null
    ? false 
    : bcrypt.compareSync(password, user.passwordHash)

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
  // User has previously logged in and token has not yet expired. Updating token value, instead of creating a new userAuth instance.
  const userAuth = await Tokens.findOne({user: user._id})
  
  try {
    if(userAuth){
      userAuth.token = token
      userAuth.expireAt = new Date()
      await userAuth.save()
      response
        .status(201)
        .send({ userAuth, username: user.username, name: user.name })
    }
    else{
      const userAuth = new Tokens({
        expireAt: new Date(),
        token: token,
        user: user._id
      })
      await userAuth.save()
      response
        .status(201)
        .send({ userAuth, username: user.username, name: user.name })
    }
  } catch (error) {
    next(error)
  }
 

})

module.exports = loginRouter