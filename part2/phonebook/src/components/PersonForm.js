const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name:{" "}
      <input
        value={newName}
        onChange={({ target }) => handleNameChange(target.value)}
      />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={({ target }) => handleNumberChange(target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
