import React from 'react'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    const alreadyAdded = persons.some((person) => person.name === newName);


    if(alreadyAdded){
      alert(`${newName} is already added to phonebook`)
    } 
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter show with 
        <input
        />
      </p>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleName}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App;