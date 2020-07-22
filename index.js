require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

/*
let persons = [
    {
      "name": "w",
      "number": "2",
      "id": 4
    },
    {
      "name": "we",
      "number": "2",
      "id": 5
    }
]
*/

app.get('/api/persons', (request, response) => {
  console.log("0")
  Person.find({}).then(people => {
    response.json(people)
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log("1")
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  console.log("2")
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  console.log("3")
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    console.log("4")
})

//               ||            ||
//---------------VV  OLD CODE  VV-----------------

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
