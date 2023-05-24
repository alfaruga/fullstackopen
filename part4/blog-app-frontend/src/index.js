import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import blogReducer from "./reducers/blogReducer";
import { createStore } from "redux";
import {Provider} from "react-redux";

const store = createStore(blogReducer);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
