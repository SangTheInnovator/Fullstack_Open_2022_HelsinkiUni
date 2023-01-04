import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Filter = (props) => <div>filter show with <input type="text" onChange={props.handleSearch}/></div>

const PersonForm = (props) => {
  const {addName, newName, newNumber, handleNameChange, handleNumberChange} = props;
  return(
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const {persons,search} = props;
  return persons.filter(
      val => {
        if (search === ""){
          return val
        }
        else if(val.name.toLowerCase().includes(search.toLowerCase())){
          return val
        }
      })
    .map(person => <p key={person.id}>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  console.log(persons)
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }   
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm 
        addName= {addName}
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App