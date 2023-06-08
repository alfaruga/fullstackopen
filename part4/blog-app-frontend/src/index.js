import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogsReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
