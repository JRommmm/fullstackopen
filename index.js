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
  //console.log("0")
  Person.find({}).then(people => {
    response.json(people)
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  //console.log("1")
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  //console.log("2")
  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })
  //console.log("3")
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
    //console.log("4")
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})


app.delete('/api/persons/:id', (request, response, next) => {
  
	console.log("1")
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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



const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}


//-- Error Handling functions

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) 

  next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
