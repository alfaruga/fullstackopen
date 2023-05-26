import { useDispatch, useSelector } from "react-redux";
import { messageToggler } from "../reducers/notificationReducer";
import { asyncVoting } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter((a) => a.content.includes(filter))
      : anecdotes;
  });

  const voteForAnecdote = (anecdoteId) => {
    const anecdote = anecdotes.find((a) => a.id === anecdoteId);

    dispatch(asyncVoting(anecdote));
  

    dispatch(messageToggler(`you voted for: "${anecdote.content}"`, 5));

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
