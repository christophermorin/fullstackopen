const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/Users')

const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {user: 0})
  try {
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const {username, name, password} = request.body
  
  if(!username || !password){
    return response.status(400).json({ error: 'Username and password required' })
  }
  if(username.length < 3 || password.length < 3){
    return response.status(400).json({error: 'Username and password must be longer than three characters'})
  }
  
  const existingUser = await User.findOne({ username })
  if(existingUser) {
    return response.status(400).json({error: 'Username must be unique'})
  }
  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    try {
      response.status(201).json(savedUser)
    } catch (error) {
      next(error)
    }
  }
})

module.exports = usersRouter