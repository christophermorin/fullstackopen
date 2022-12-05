const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
  if(req.path !== '/api/login' && req.path !== '/api/users'){
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
  }
  next()
}

const unknownEndpoint = (req, res, next) => {
  return res.status(404).send( { error: 'Unknown Endpoint'} )
}

const errorHandler = (req, res, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send( {error: 'malformed ID'} )
  } 
  else if (error.name === 'ValidationError') {
    return res.status(400).json( {error: error.message} ) 
  }
  else if(error.name === 'JsonWebTokenError') {
    return res.status(400).json( {error: 'Invalid or missing token'})
  }
  else if(error.name === 'Unauthorized'){
    return res.status(401).json( {error: 'Unauthorized access'})
  }

  next(error)
}

const extractToken = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7) 
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if(!req.token){
    return res.status(401).json({error: 'Access Denied'})
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const user = await Users.findById(decodedToken.id, {passwordHash: 0})
  req.user = user
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  extractToken,
  userExtractor
}