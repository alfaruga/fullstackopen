import { useState, useEffect } from "react";
import Input from "./Components/Input";
import Numbers from "./Components/Numbers";
import phoneService from "./Services/PhoneService.js";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newnumber, setnumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const hook = () => {
    phoneService.retrieve().then((response) => {
      setPersons(response);
    });
  };

  useEffect(hook, []);

  const nameHandler = (event) => setNewName(event.target.value);
  const numberHandler = (event) => setnumber(event.target.value);
  const filterHandler = (event) => setFilterValue(event.target.value);
  const messageHandler = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const deleteHandler = (id) => {
    const nameToDelete = persons.find((person) => person.id === id).name;

    if (window.confirm(`Delete ${nameToDelete}?`)) {
      phoneService
        .deleteNumber(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setError(false);
        })
        .catch((error) => {
          messageHandler(
            `Information of ${nameToDelete} has already been removed from server`
          );
          setError(true);
        });
    }
  };
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
          messageHandler(`Updated ${changedPhoneNumber.name}'s number`);
        });
      }
    } else {
      const newPhone = {
        name: newName,
        number: newnumber,
      };

      phoneService.create(newPhone).then((response) => {
        setPersons(persons.concat(response.data));

      });

      messageHandler(`Added ${newPhone.name}`);

      phoneService.retrieve().then((response) => {
        setPersons(response);
      })
    }
    setNewName("");
    setnumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Input
        name={"fillter names with"}
        handlerFunction={filterHandler}
        value={filterValue}
      />
      <form onSubmit={submitHandler}>
        <h2>add a new phonenumber</h2>
        <Input name={"name"} handlerFunction={nameHandler} value={newName} />
        <Input
          name={"number"}
          handlerFunction={numberHandler}
          value={newnumber}
        />
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
