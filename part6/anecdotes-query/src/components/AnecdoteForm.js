import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../request";
import { useContext } from "react";
import appContext from "../context/appContext";

const AnecdoteForm = () => {
  const [message, messageDispatch] = useContext(appContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      //queryClient.invalidateQueries("anecdotes");
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    newAnecdoteMutation.mutate({ content: content, votes: 0 });
    event.target.anecdote.value = "";
    messageDispatch({ type: "ADD", payload: content });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
