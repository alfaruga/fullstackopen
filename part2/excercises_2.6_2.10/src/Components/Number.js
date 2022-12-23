
const Number = (props) => {
    const deleteHandler = () =>{
        
        props.deletes(props.data.id)

      }
  return (
    <div>
      <span>
        {props.data.name} {props.data.number} 
      </span>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};
export default Number;
