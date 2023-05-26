import { useDispatch } from "react-redux";
import { asyncCreation } from "../reducers/anecdoteReducer";
import { setMessage, clearMessage, messageToggler } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    dispatch(asyncCreation(content));

    event.target.content.value = "";
  
    dispatch(messageToggler(`New anecdote added: "${content}"`, 5));

  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input id="content" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
