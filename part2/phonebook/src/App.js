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

  const filteredPersons =
    filterText === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterText.toLowerCase())
        );

  const handleFilterChange = (event) => {
    const newFilterText = event.target.value;
    setFilterText(newFilterText);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

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

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };
    const existingPersonIndex = persons.findIndex(
      (person) => person.name === newName
    );

    if (existingPersonIndex !== -1) {
      const person = persons[existingPersonIndex];

      if (person.number === newNumber) {
        alert(`${person.name} is already added to phonebook`);
      } else if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, newPersonObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            showNotification(`Changed phone number for ${person.name}`);
          })
          .catch((error) => {
            setPersons(persons.filter((p) => p.id !== person.id));
            showNotification(
              `Information of ${person.name} has already been removed from the server`,
              true
            );
          });
      }
    } else if (existingPersonIndex === -1) {
      personService.create(newPersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showNotification(`Added ${newName}`);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const deletedPersonName = persons.find((person) => person.id === id).name;

    if (window.confirm(`Delete ${deletedPersonName}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(
            `Information of ${deletedPersonName} has already been removed from the server`,
            true
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorClassName={errorClassName} />
      <Filter value={filterText} handler={handleFilterChange} />
      <h2>add a new </h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
