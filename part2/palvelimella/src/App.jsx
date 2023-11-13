import { useState, useEffect } from 'react'
import personService from './services/persons'

const ShowPersons = (props) => {
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        props.setPersons(response.data)
      })
  }, [])
    return (
      props.persons.map(person => 
        person.name.toLowerCase().includes(props.nameFiltered.toLowerCase())
         &&
         <li key={person.name}> {person.name} {' '}
          {person.number} {' '} 
          <button onClick = { () => {props.deletePerson(person.id)}} >delete</button>
          </li>)
    )
}

const AddNewPerson = (props) => {
  const seconds = 3
  const [message, setMessage] = useState('')
  const addPerson = (event) => {
    event.preventDefault()
    let validationErrors = false
    const personObject = {
      name: props.newName,
      number: props.newNumber
    }

    if (props.newName.trim().length === 0) {
      validationErrors = true
      alert(`No name entered !`)
    }
    if (props.newNumber.trim().length === 0) {
      validationErrors = true
      alert(`No number entered !`)
    }

    if (validationErrors === false) {
      const personExists = props.persons.find((person) => person.name === props.newName)
      if (personExists === undefined) {
        personService
          .create(personObject)
          .then(response => {
            props.setPersons(props.persons.concat(response.data))
            setMessage(`${personObject.name} added in phonebook.`)
            setTimeout(() => {
              setMessage(null)
            },seconds * 1000)
              
            props.setNewName('')
            props.setNewNumber('')
        })
      } else {       
        if  (!props.persons.some((p) => p.name.includes(props.newName) && p.number.includes(
            props.newNumber))) {
          if (window.confirm(`${props.newName} is already added in phonebook, replace old number
              with a new one ? `)) {
              const personChangedObject = {
                name: props.newName,
                number: props.newNumber,
                id: personExists.id
              }
            personService 
              .update(personExists.id, personChangedObject)
              .then(response => {
                const current = [...props.persons]
                const ind = current.findIndex( p => p.id === personExists.id)
                current[ind] = personChangedObject
                props.setPersons(current)
                setMessage(`Phone number of ${personObject.name} changed as ${personObject.number}.`)
                setTimeout(() => {
                  setMessage(null)
                },seconds * 1000)
              })
          }
        } else {
            alert(`${props.newName} ${props.newNumber} is alredy in phonebook`)
          }
      }
    }
  }
  return (
    <form onSubmit={addPerson}>
      <DisplayMessage message={message}/>
          name:  
          <input 
            value={props.newName}
            onChange={props.handleNameChange}
          />
          <br></br>
          number:
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
          <br></br>
          <button type="submit">  add</button>
      </form>
  )
}

const FilterPersons = (props) =>  {
  return (
    <div>
    filter shown with
      <input 
            value={props.nameFiltered}
            onChange={props.handleNameFiltered}
          />
    </div>
  )
}

const DisplayMessage = (props) => {
  return (
    <div className="timerMessage">
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFiltered, setnameFiltered] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const style = {
        color: isError ? 'red' : 'green',
        fontSize: 20,
        padding: 10,
        marginBottom: 10
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFiltered = (event) => {
    setnameFiltered(event.target.value)
  }

  const deletePersonOf = (id) => {
    const personToRemove = persons.find((person) => person.id === id)
    const seconds = 3 
    
    if (window.confirm(`Do you want to remove ${personToRemove.name} ?`)) {
        personService
          .deletePerson(id)
          .then(() => {
            setPersons((persons) =>
              persons.filter((person) => person.id !== id)
            )
            setIsError(false)
            setMessage(`${personToRemove.name} removed from phonebook`)
            
            setTimeout(() => {
              setMessage(null)
            },seconds * 1000)
           }
          )
          .catch(error => {
            setIsError(true)
            setMessage(`${personToRemove.name} was already removed from phonebook`)
            setTimeout(() => {
              setMessage(null)
            },seconds * 1000)
            setPersons((persons) =>
              persons.filter((person) => person.id !== id)
            ) 
          })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons nameFiltered={nameFiltered} handleNameFiltered={handleNameFiltered}/>

      <div style={style}>
        {isError ? true : false}
        {message}
      </div>

      <h3>add a new</h3>
      
      <AddNewPerson persons={persons} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <ul>
        <ShowPersons persons={persons} nameFiltered={nameFiltered} setPersons=
          {setPersons} deletePerson={(id) => deletePersonOf(id)}/>
      </ul>
    </div>
  )
}

export default App
