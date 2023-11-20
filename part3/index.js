const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)})

app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] :response-time :response-body'))

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

let persons = []

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  /*app.get('/info', (req, res) => {
    const numberOfPersons = persons.length
    let date = new Date()
    const txt = `Phonebook has info for ${numberOfPersons} people <br/> <br/> ${date}`
    res.send(txt)
  })*/

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(deletedPerson => {
      persons = persons.filter(person => person.id !== deletedPerson.id)
      response.status(204).end()
    })
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }
    if (body.number === undefined) {
      return response.status(400).json({ error: 'number missing' })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

   /* if (persons.find(existing => existing.name === person.name)) {
      return response.status(400).json({ 
        error: 'person already in phonebook' 
      })
    }*/

    person.save().then(savedPerson => {
      persons = persons.concat(savedPerson)
      response.json(savedPerson)
    })
  })  

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
