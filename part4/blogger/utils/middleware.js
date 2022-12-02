const logger = require('./logger')

const requestLogger = (req, res, next) => {
  if(req.path !== '/api/login'){
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

  next(error)
}

const extractToken = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7) 
  }
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  extractToken

}