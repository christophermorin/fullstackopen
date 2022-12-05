const Tokens = require('../models/Tokens')
const authRouter = require('express').Router()


authRouter.get('/:id', async (request, response, next) => {
  console.log(request.params.id)
  const user = await Tokens.findOne({user: request.params.id})
  console.log(user)
  try {
    response.status(200).json(user.token)
  } catch (error) {
    next(error)
  }
})

module.exports = authRouter