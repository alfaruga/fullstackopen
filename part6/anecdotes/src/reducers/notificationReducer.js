import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Hello World from notificationReducer",
  reducers: {
    setMessage(state, action) {
      const newMessage = action.payload;
      state = newMessage;
      return state;
    },
    clearMessage(state, action) {
      state = "";
      return state;
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

export const messageToggler = (message, time) => {
  return async (dispatch) => {
    console.log("does it reach notification toggler?");
    dispatch(setMessage(message));
    console.log("does it pass the first dispatch?");

    setTimeout(() => {
      dispatch(clearMessage());
    }, time*1000);
  };
};

export default notificationSlice.reducer;
