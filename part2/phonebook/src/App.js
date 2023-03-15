import axios from "axios";
import { useState, useEffect } from "react";

const Filter = ({ value, handler }) => (
  <div>
    filter shown with
    <input value={value} onChange={handler} />
  </div>
);

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number:{" "}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.id} name={person.name} number={person.number} />
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filteredPersons =
    filterText === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterText)
        );

  const handleFilterChange = (event) => {
    const newFilterText = event.target.value.toLowerCase();
    setFilterText(newFilterText);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.findIndex((persona) => persona.name === newName) !== -1) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
