const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')
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

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app