import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, vote } from "./request";

const App = () => {
  const queryClient = useQueryClient();
  const voteMutation = useMutation(vote, {
    onSuccess: (updatedAncdote) => {
      const anecdotesState = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotesState.map((a) =>
          a.id === updatedAncdote.id ? updatedAncdote : a
        )
      );

      //queryClient.invalidateQueries("anecdotes")
    },
  });

  const handleVote = (anecdote) => {
    const editedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(editedAnecdote);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });
  if (result.isLoading) {
    return <div>anecdote service not available due to server problems...</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
