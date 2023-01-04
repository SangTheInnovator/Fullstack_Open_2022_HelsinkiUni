import React, { useState, useEffect } from "react";

import "./App.css";
import InputField from "./components/InputField";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) =>
     
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredPersons(filtered);
  };

  
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    
    const alreadyExists = persons.some((person) => person.name === newName);

   
    if (newName === "") {
      return;
    }

    if (alreadyExists) {
      const person = persons.find((p) => p.name === newName);
      const changedPerson = { ...person, number: newNumber };
      const { id } = person;

      
      if (newNumber < 8) {
        setNotificationMessage({
          error: `${newNumber} is too short, please provide a number with at least 8 digits`,
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        return;
      }

      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );

            setNotificationMessage({
              notification: `Updated number for ${person.name}`,
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage({
              error: `Information for ${person.name} has already been removed from server`,
            });
            setPersons(persons.filter((p) => p.id !== id));
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
      
      setNewName("");
      setNewNumber("");
      return;
    }

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setNotificationMessage({
          notification: `Added ${returnedPerson.name}`,
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);

        
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotificationMessage(error.response.data);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      personService.deletePerson(id).then(() => {
        
        const filteredPersons = persons.filter((person) => person.id !== id);
        setPersons(filteredPersons);

        
        setFilter("");
      });
    }
  };

  return (
    <main className="container">
      <h1>Phonebook</h1>
      <Notification
        message={
          notificationMessage?.notification || notificationMessage?.error
        }
        className={notificationMessage?.notification ? "notification" : "error"}
      />

      <InputField
        label="Filter shown with"
        htmlFor="filter"
        type="text"
        value={filter}
        onChange={handleFilter}
      />

      <h2>Add a new</h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default App;