const Person = ({ name, number, deletePerson }) => (
  <p>
    {name} {number}
    <button onClick={deletePerson}>delete</button>
  </p>
);

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map((person) => (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        deletePerson={() => deletePerson(person.id)}
      />
    ))}
  </div>
);

export default Persons;
