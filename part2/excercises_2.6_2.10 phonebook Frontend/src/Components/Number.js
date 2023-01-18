const Number = (props) => {
  return (
    <div>
      <span>
        {props.data.name} {props.data.number}
      </span>
      <button onClick={() => props.deletes(props.data.id)}>Delete</button>
    </div>
  );
};
export default Number;
