import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload;
      state.push(asObject(anecdote));
    },
    vote(state, action) {
      const anectodeToEdit = state.find(a => a.id === action.payload);

      const editedAnecdote = {
        ...anectodeToEdit,
        votes: anectodeToEdit.votes + 1,
      };

      return state.map((a) =>
        a.id === editedAnecdote.id ? editedAnecdote : a
      );
    },
  },
});

/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE":
      return state.map((anecdote) =>
        anecdote.id === action.payload.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    case "CREATE":
      const newNote = asObject(action.payload.content);
      console.log("what's this?", [...state, newNote]);
      return [...state, newNote];
    default:
      return state;
  }
}; */

/* export const vote = (id) => {
  return {
    type: "LIKE",
    payload: { id },
  };
}; */

/* export const createAnecdote = (content) => {
  return {
    type: "CREATE",
    payload: { content },
  };
}; */

export const { createAnecdote, vote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
