import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const Button = (props) => (<button onClick={props.clicked}>{props.text}</button>);

  const Anecdote = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        {props.anecdote}
        <p>has {props.votes} votes</p>
      </div>
    );
  };
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(7));

  const random = () => Math.round(Math.random() * (anecdotes.length - 1));
  const anecdotesHandler = () => setSelected(random());
  const votesHandler = () => {
    var copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  const mostVoted = () => votes.indexOf(Math.max(...votes));

  var topAnecdote =
    votes.reduce((previous, current) => {
      return previous + current;
    }, 0) === 0 ? (
      "No votes yet!"
    ) : (
      <Anecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[mostVoted()]}
        votes={votes[mostVoted()]}
      />
    );
  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button clicked={() => votesHandler()} text="vote" />
      <Button clicked={anecdotesHandler} text="new anecdote" />
      {topAnecdote}
    </div>
  );
};

export default App;
