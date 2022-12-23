import Number from "./Number";

const Numbers = (props) =>{
  const deletePhone =(id)=>{
    
    props.deletePhone(id)
  }
    const content =
    props.filter === ""
      ? props.persons.map((person) => {
          return (
            <Number key={person.name} data={person} deletes= {deletePhone}/>
          );
        })
      : props.persons
          .filter((person) =>
            person.name.toLowerCase().match(props.filter.toLowerCase())
          )
          .map((person) => (
            <Number key={person.name} data={person} deletes= {deletePhone}/>
          ));
    return(
        <div>
        <h2>Numbers</h2>
        {content}
        </div>
    )
}

export default Numbers