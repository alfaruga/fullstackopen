import { createSlice } from "@reduxjs/toolkit";
const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "Hello from notification", error: false },
  reducers: {
    setNotification(state, action) {
      console.log('actions payload error',action.payload.error);
      return { error: action.payload.error, message: action.payload.message };
    },
    clearNotification(state, action) {
      return { ...state, message: null };
    },
  },
});

export const setNotificationAction = (data) => {
  return (dispatch) => {
    dispatch(setNotification(data));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
