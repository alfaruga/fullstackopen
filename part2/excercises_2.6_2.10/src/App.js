import { useState, useEffect } from "react";
import Input from "./Components/Input";
import Numbers from "./Components/Numbers";
import axios from "axios";

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newnumber, setnumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const hook = () => {
    console.log("Here's the hook");
    axios
    .get("http://localhost:3001/persons")
    .then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };
  console.log("render", persons.length, "persons")

  useEffect(hook, []);

  const equals = (objectA, objectB) => {
    const a = Object.getOwnPropertyNames(objectA);
    const b = Object.getOwnPropertyNames(objectB);
    if (a.length !== b.length) return false;
    const hasAllKeys = a.every((value) => !!b.find((v) => v === value));
    if (!hasAllKeys) return false;
    for (const key of a) if (objectA[key] !== objectB[key]) return false;
    return true;
  };

  const nameHandler = (event) => setNewName(event.target.value);
  const numberHandler = (event) => setnumber(event.target.value);
  const filterHandler = (event) => setFilterValue(event.target.value);

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
      <Input
        name={"fillter names with"}
        handlerFunction={filterHandler}
        value={filterValue}
      />
      <form onSubmit={submitHandler}>
        <h2>add a new</h2>
        <Input name={"name"} handlerFunction={nameHandler} value={newName} />
        <Input
          name={"number"}
          handlerFunction={numberHandler}
          value={newnumber}
        />
        <button type="submit">add</button>
      </form>
      <Numbers filter={filterValue} persons={persons} />
    </div>
  );
};
export default App;
