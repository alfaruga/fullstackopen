import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setMessage, clearMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter((a) => a.content.includes(filter))
      : anecdotes;
  });

  const voteForAnecdote = (anecdoteId) => {
    const content = anecdotes.find((a) => a.id === anecdoteId).content;
    
    dispatch(vote(anecdoteId));
    dispatch(setMessage(`you voted for: "${content}"`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };

  const content = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => voteForAnecdote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));

  return <div>{content}</div>;
};

export default AnecdoteList;
