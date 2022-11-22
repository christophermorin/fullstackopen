const e = require("express");
const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
morgan.token('body', req => {
  return JSON.stringify(req.body)
})


app.use(express.json());
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const bookEntries = `
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>`;
  res.send(bookEntries);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    return res.status(404).json({ error: "Entry does not exist" });
  }
});

app.delete("/api/persons/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  const filteredPersons = persons.filter((person) => person.id != id);
  if (person) {
    persons = filteredPersons;
    res.status(204).end();
  } else {
    return res.status(404).json({ error: "Entry does not exist" });
  }
});

const createId = () => {
  const randomId = Math.floor(Math.random() * 5000);
  return randomId;
};

app.post("/api/persons", (req, res) => {
  console.log(`Here is a new person: ${JSON.stringify(req.body)}`)
  const name = req.body.name;
  const number = req.body.number;
  const duplicate = persons.find((person) => person.name === name);
  console.log(duplicate);
  if (!name || !number) {
    return res.status(400).json({
      error: "Content is required",
    });
  } else if (duplicate) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  } else {
    const newEntry = {
      id: req.body.id,
      name: req.body.name,
      number: req.body.number,
      
    };
    persons = [...persons, newEntry];
  }
  res.status(200).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
