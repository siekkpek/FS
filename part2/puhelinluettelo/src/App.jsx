import { useState } from 'react'

const ShowPersons = (props) => {
    return (
      props.persons.map(person => 
        person.name.toLowerCase().includes(props.nameFiltered.toLowerCase()) &&
         <li key={person.name}> {person.name} {person.number}</li>)
    )
}

const AddNewPerson = (props) => {
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
      const personExists = props.persons.find((person) => person.name === personObject.name)
      if (personExists === undefined) {
        props.setPersons(props.persons.concat(personObject))
        props.setNewName('')
        props.setNewNumber('')
      } else {
        alert(`${props.newName} is already added to phonebook`)
      }
    }
  }
  return (
    <form onSubmit={addPerson}>       
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFiltered, setnameFiltered] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFiltered = (event) => {
    setnameFiltered(event.target.value)
  }
      
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons nameFiltered={nameFiltered} handleNameFiltered={handleNameFiltered}/>
      
      <h3>add a new</h3>
      <AddNewPerson persons={persons} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
   
      <h3>Numbers</h3>
      <ul>
        <ShowPersons persons={persons} nameFiltered={nameFiltered}/>
      </ul>
    </div>
  )
}

export default App