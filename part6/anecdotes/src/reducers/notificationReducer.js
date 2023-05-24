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
    clearMessage(state, payload) {
      state = null;
      return state;
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
