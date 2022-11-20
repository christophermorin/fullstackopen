import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  console.log('app runs')

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  },[])

  const handleFilter = (event) => {
    let search = event.target.value.toLowerCase()
    console.log(search)
    
    let filtered = []
    for (let person of persons) {
      if (person.name.slice(0,search.length).toLowerCase() === search) {
        filtered.push(person)
      }
    }
    setFilter(filtered)

    if(search === ''){
      setFilter([])
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addEntry = () => {
    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber
      }
    ])
    setNewName('')
    setNewNumber('')
  }

  const checkEntry = (event) => {
    event.preventDefault()
    let found = false
    for (let person of persons) {
      if (person.name === newName) {
        found = true
      }
    }
    return found ? alert(`${newName} is already in you book`) : addEntry()
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={handleFilter}/>
      <Form 
        submit={checkEntry} 
        getName={handleName} 
        getNumber={handleNumber}
        nameVal={newName}
        numberVal={newNumber}
        />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filter} />
    </div>
  )
}

export default App