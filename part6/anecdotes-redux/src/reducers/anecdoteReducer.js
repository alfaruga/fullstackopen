import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotesService";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      return state.map((a) => (a.id === action.payload.id ? action.payload : a));
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const asyncCreation = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(anecdote));
  };
};

export const asyncVoting = (anecdote) => {
  return async (dispatch) => {
    console.log("reaches the async function");
    const responseData = await anecdotesService.vote(anecdote);
    console.log("data from server:", responseData);
    dispatch(vote(responseData));
  };
};



export default anecdotesSlice.reducer;
