import { createSlice } from "@reduxjs/toolkit";
import { setNotificationAction } from "./notificationReducer";

import loginService from "../services/login";
import blogService from "../services/blog";
const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const loginAction = (loginData) => {
  return async (dispatch) => {
    try {
      const userData = await loginService(loginData);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData));
      blogService.setToken(userData.token);
      console.log("response from the server", userData);

      dispatch(setUser(userData));
      dispatch(
        setNotificationAction({
          message: `${userData.username} logged in`,
          error: false,
        })
      );
    } catch (error) {
        dispatch(setUser(''));

      dispatch(
        setNotificationAction({ message: "Wrong Credentials", error: true })
      );
    }
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
