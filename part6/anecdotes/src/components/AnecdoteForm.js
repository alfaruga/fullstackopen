import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setMessage, clearMessage } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    dispatch(createAnecdote(content));
    dispatch(setMessage(`Added: ${content}`));
    setTimeout(() => {
      dispatch(clearMessage(""));
    }, 5000);
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
