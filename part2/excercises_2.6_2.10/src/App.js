import { useState } from "react";
import Input from "./Components/Input";
import Numbers from "./Components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newnumber, setnumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const equals = (objectA, objectB) => {
    const a = Object.getOwnPropertyNames(objectA);
    const b = Object.getOwnPropertyNames(objectB);
    if (a.length !== b.length) return false;
    const hasAllKeys = a.every((value) => !!b.find((v) => v === value));
    if (!hasAllKeys) return false;
    for (const key of a) if (objectA[key] !== objectB[key]) return false;
    return true;
  };

  const nameHandler = (event) => setNewName(event.target.value)
  const numberHandler = (event) => setnumber(event.target.value)
  const filterHandler = (event) => setFilterValue(event.target.value)

  const submitHandler = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.some((person) =>
      equals(person, { name: newName })
    );

    if (alreadyAdded) {
      alert(`${newName} is already added to numberbook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newnumber }));
    }
    setNewName("");
    setnumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name={"fillter names with"} handlerFunction={filterHandler} value={filterValue} />  
      <form onSubmit={submitHandler}>
            <h2>add a new</h2>
            <Input name={"name"} handlerFunction={nameHandler} value={newName} />
            <Input name={"number"} handlerFunction={numberHandler} value={newnumber} />
          <button type="submit">add</button>
      </form>
      <Numbers filter={filterValue} persons={persons}/>
    </div>
  );
};
export default App;
