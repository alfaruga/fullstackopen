import { createSlice } from "@reduxjs/toolkit";
const initialState = ""
const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      const text = action.payload;
      state = action.payload;
      return state
    },
    clearNotification(state, action) {
        
        return ''
    },
  },
});

export const {setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer