const express = require("express")
const db = require("./db.json")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/notes", (req, res) => {
  res.json(db.notes)
})

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(3001, () => {
  console.log("Server running on port 3001")
})