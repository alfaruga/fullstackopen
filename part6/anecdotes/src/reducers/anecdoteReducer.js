import { createSlice } from "@reduxjs/toolkit";


const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const anectodeToEdit = state.find((a) => a.id === action.payload);

      const editedAnecdote = {
        ...anectodeToEdit,
        votes: anectodeToEdit.votes + 1,
      };

      return state.map((a) =>
        a.id === editedAnecdote.id ? editedAnecdote : a
      );
    },

    setAnecdotes(state, action) {
      return action.payload;
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

export const { createAnecdote, vote, addAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
