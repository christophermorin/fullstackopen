const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const database = require('./models/phonebook')
require('dotenv').config()

database()

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :body')
)

app.get('/api', (req, res) => {
  res.render('build/index')
})

app.get('/api/persons', (req, res) => {
  database.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  database.find({}).then((persons) => {
    const bookEntries = `
            <div>Phonebook has info for ${persons.length} people</div>
            <div>${new Date()}</div>`
    res.send(bookEntries)
  })
})

app.delete('/api/persons/delete/:id', (req, res, next) => {
  database
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  database
    .findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  console.log(`Here is a new person: ${JSON.stringify(req.body)}`)
  const name = req.body.name
  const number = req.body.number

  if (!name || !number) {
    return res.status(400).json({
      error: 'Content is required',
    })
  }
  const person = new database({
    name: name,
    number: number,
  })

  person.save()
    .then((newPerson) => res.json(newPerson))
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }
  database
    .findByIdAndUpdate(req.params.id, person, { new: true , runValidators: true, context: 'query' })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ReferenceError') {
    response.status(404).send({ error: 'Entry not found' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
