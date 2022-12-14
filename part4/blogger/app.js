const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')
const usersRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
const authRouter = require('./controllers/authController')
const middleware = require('./utils/middleware')


const mongoUrl = config.DB_URI
mongoose.connect(mongoUrl)
  .then(res => {
    console.log('Connected')
  })
  .catch(error => console.log(error))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.extractToken)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testingRouter')
  app.use('/api/testing', testingRouter)
}

app.use('/api/login', loginRouter)
app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app