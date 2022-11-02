import Number from "./Number";

const Numbers = (props) =>{
    const content =
    props.filter === ""
      ? props.persons.map((person) => {
          return (
            <Number key={person.name} data={person}/>
          );
        })
      : props.persons
          .filter((person) =>
            person.name.toLowerCase().match(props.filter.toLowerCase())
          )
          .map((person) => (
            <Number key={person.name} data={person}/>
          ));
    return(
        <div>
        <h2>Numbers</h2>
        {content}
        </div>
    )
}

export default Numbers