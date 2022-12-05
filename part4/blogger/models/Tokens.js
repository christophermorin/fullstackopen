const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  "expireAt": {type: Date, expires: 3600 },
  token: String,
  user: String
})

tokenSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Tokens', tokenSchema)