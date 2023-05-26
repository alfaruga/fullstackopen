import { useDispatch } from "react-redux";
import { queryFilter } from "../reducers/filterReducer";

const style = {
  marginBottom: 10,
};
const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div style={style}>
      filter
      <input
        type="text"
        onChange={(e) => dispatch(queryFilter(e.target.value))}
      ></input>
    </div>
  );
};

export default Filter;
