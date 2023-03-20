import { useState, useEffect } from "react";

import personService from "./services/persons";

import Notification from "./components/Notification";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorClassName, setErrorClassName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredPersons = filterText
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : persons;

  const showNotification = (message, isError) => {
    setErrorMessage(message);
    if (isError) {
      setErrorClassName("error");
    }
    setTimeout(() => {
      setErrorMessage(null);
      setErrorClassName("");
    }, 5000);
  };

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const updatePerson = (person) => {
    if (person.number === newNumber) {
      alert(`${person.name} is already added to phonebook`);
      return;
    }

    const confirm = window.confirm(
      `${person.name} is already added to phonebook, replace the old number with a new one?`
    );
    if (confirm) {
      personService
        .update(person.id, { ...person, number: newNumber })
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          showNotification(`Changed phone number for ${person.name}`);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          showNotification(error.response.data.error, true);
        });
    }

    resetForm();
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      updatePerson(person);
      return;
    }

    personService
      .create({ name: newName, number: newNumber })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showNotification(`Added ${newName}`);
      })
      .catch((error) => {
        showNotification(error.response.data.error, true);
        console.log(error.response.data.error);
      });

    resetForm();
  };

  const deletePerson = (id) => {
    const deletedPersonName = persons.find((person) => person.id === id).name;

    if (window.confirm(`Delete ${deletedPersonName}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorClassName={errorClassName} />
      <Filter value={filterText} handler={setFilterText} />
      <h2>add a new </h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={setNewName}
        handleNumberChange={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
