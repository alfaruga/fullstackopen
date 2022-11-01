import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const equals = (objectA, objectB) => {
    const a = Object.getOwnPropertyNames(objectA);
    const b = Object.getOwnPropertyNames(objectB);
    if (a.length !== b.length) return false;
    const hasAllKeys = a.every((value) => !!b.find((v) => v === value));
    if (!hasAllKeys) return false;
    for (const key of a) if (objectA[key] !== objectB[key]) return false;
    return true;
  };
  
  const inputHandler = (event) => {
    setNewName(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.some((person) => equals(person, { name: newName }));

    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
    }
    setNewName("");
  };

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={inputHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
