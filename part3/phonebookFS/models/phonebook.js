const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DATABASE_URI

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function(num) {
        const withThree = /^[0-9]{3}?[-\s]?[0-9]{8}$/im
        const withTwo = /^[0-9]{2}?[-\s]?[0-9]{7}$/im
        if(withThree.test(num)){
          return true
        }
        if(withTwo.test(num)){
          return true
        }
        return false
      }
    },
    minLength: 8,
    required: true,
  }
})
mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((err) => console.log(err))

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phoneBookSchema)

const withThree = /^[0-9]{3}?[-\s]?[0-9]{8}$/im
const withTwo = /^[0-9]{3}?[-\s]?[0-9]{8}$/im