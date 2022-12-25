import { useState, useEffect } from "react";
import Input from "./Components/Input";
import Numbers from "./Components/Numbers";
import phoneService from "./Services/PhoneService.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newnumber, setnumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const hook = () => {
    phoneService.retrieve().then((response) => {
      setPersons(response);
    });
  };

  useEffect(hook, []);

  const nameHandler = (event) => setNewName(event.target.value);
  const numberHandler = (event) => setnumber(event.target.value);
  const filterHandler = (event) => setFilterValue(event.target.value);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      phoneService.deleteNumber(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
    }
  ;

  const submitHandler = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.some((person) => person.name === newName);

    if (alreadyAdded) {
      if (
        window.confirm(`${newName} is already added to phonebook, replace the old number
      with a new one?`)
      ) {
        var phoneNumber = persons.find((person) => person.name === newName);
        const id = phoneNumber.id;
        const changedPhoneNumber = { ...phoneNumber, number: newnumber };

        phoneService.update(id, changedPhoneNumber).then((response) => {
          setPersons(
            persons.map((person) => {
              return person.id !== changedPhoneNumber.id ? person : response;
            })
          );
        });
      }
    } else {
      const newPhone = {
        name: newName,
        number: newnumber,
      };

      phoneService
        .create(newPhone)
        .then((response) => setPersons(persons.concat(response)));
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
        <h2>add a new phonenumber</h2>
        <Input name={"name"} handlerFunction={nameHandler} value={newName} />
        <Input name={"number"} handlerFunction={numberHandler} value={newnumber}/>
        <button type="submit">add</button>
      </form>
      <Numbers
        filter={filterValue}
        persons={persons}
        deletePhone={deleteHandler}
      />
    </div>
  );
};
export default App;
