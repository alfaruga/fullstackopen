import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setMessage, clearMessage } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotesService";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    event.target.content.value = "";

    const newAnecdote = await anecdotesService.createNew(content);

    dispatch(createAnecdote(newAnecdote));
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
