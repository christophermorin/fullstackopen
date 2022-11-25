const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://sohdat:${password}@cluster0.tmrd0iu.mongodb.net/?retryWrites=true&w=majority`

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PersonEntry = mongoose.model('Person', phoneBookSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
  })
  .then(() => {

    if(process.argv.length === 3){
      PersonEntry
        .find({})
        .then(persons => persons.forEach(person => {
          console.log(`${person.name} ${person.number}`)
          mongoose.connection.close()
        }))
    }
    else{
      const person = new PersonEntry({
        name: name,
        number: number,
      })
      person.save()
        .then(result => {
          console.log(`Added ${name} number ${number} to the phonebook`)
          mongoose.connection.close()
        })
    }
  })
  .catch((err) => console.log(err))