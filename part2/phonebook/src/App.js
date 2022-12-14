import { useEffect, useState } from "react";
import peopleServices from "./services/people";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notificaton";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    peopleServices.getAll().then((people) => {
      setPersons(people);
    });
  }, []);

  const handleFilter = (event) => {
    let search = event.target.value.toLowerCase();
    let filtered = [];

    for (let person of persons) {
      if (person.name.slice(0, search.length).toLowerCase() === search) {
        filtered.push(person);
      }
    }
    setFilter(filtered);
    if (search === "") {
      setFilter([]);
    }
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addEntry = (newEntry) => {
    peopleServices
      .addPerson(newEntry)
      .then((result) => {
        setPersons([...persons, result]);
        setError(false);
        setMessage(`${newEntry.name} added to phonebook`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setError(true);
        setMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });

    setNewName("");
    setNewNumber("");
  };

  const checkEntry = (event) => {
    event.preventDefault();
    const newEntry = {
      name: newName,
      number: newNumber,
    };
    let allNames = persons.map((person) => person.name);
    // If persons does not include person, create new and send to addentry with id
    // else, ask if you want to update, pass persons id
    if (allNames.includes(newName)) {
      let duplicate = persons.find((person) => person.name === newName);
      console.log(duplicate.id);
      updateNumber(duplicate.id);
    } else {
      addEntry(newEntry);
    }
  };

  const updateNumber = (id) => {
    let person = persons.find((person) => person.id === id);
    let updatedPerson = { ...person, number: newNumber };

    if (
      window.confirm(
        `${person.name} number already exsist, would you like to update it?`
      )
    ) {
      peopleServices
        .updatePerson(id, updatedPerson)
        .then(() => {
          setError(false);
          setPersons(
            persons.map((person) => (person.id !== id ? person : updatedPerson))
          )
          setMessage(`${person.name} has been updated`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error)
          setError(true);
          setMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteEntry = (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const newListOfPeople = persons.filter((person) => person.id !== id);
      setPersons(newListOfPeople);
      peopleServices
        .deletePerson(id)
        .then(() => {
          setError(false);
          setMessage("Entry deleted");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setError(true);
          setMessage("Entry has already been deleted");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };
  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={handleFilter} />
      {message ? <Notification message={message} error={error} /> : <div></div>}
      <Form
        submit={checkEntry}
        getName={handleName}
        getNumber={handleNumber}
        nameVal={newName}
        numberVal={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filter} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
