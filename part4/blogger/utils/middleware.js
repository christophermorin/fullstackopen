const { exists } = require('../models/Blog')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
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

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}