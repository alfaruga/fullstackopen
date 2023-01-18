import Number from "./Number";

const Numbers = (props) => {
  const numbersList = (phoneNumber) => (
    <Number
      key={phoneNumber.name}
      data={phoneNumber}
      deletes={props.deletePhone}
    />
  );
  const content =
    props.filter === ""
      ? props.persons.map(numbersList)
      : props.persons
          .filter((person) =>
            person.name.toLowerCase().match(props.filter.toLowerCase())
          )
          .map(numbersList);
  return (
    <div>
      <h2>Numbers</h2>
      {content}
    </div>
  );
};

export default Numbers;
