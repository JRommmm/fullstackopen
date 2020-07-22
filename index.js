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
  Person.find({}).then(people => {
    response.json(people)
  })
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

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  //Below init is wrong, variables are: name, number id (person)
  const person = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
