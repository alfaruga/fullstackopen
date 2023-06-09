import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import styles from "./App.module.css";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogFrom from "./components/BlogForm";
import UserHeader from "./components/UserHeader";
import BlogList from "./components/BlogList";

import { initializeBlogsAction } from "./reducers/blogsReducer";
import { setLocalUserAction } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeBlogsAction());
  }, [dispatch]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLocalUserAction(user));
    }
  }, []);

  return (
    <div className={styles.App}>
      <Notification />
      <header className="header">
        <div className={styles.header}>
          <h1 className={styles.title}>Blogs app</h1>
        </div>
      </header>
      <UserHeader />
      {user === null && (
        <Togglable label="login" hideLabel={"Cancel"} ref={loginFormRef}>
          <LoginForm />
        </Togglable>
      )}
      {user !== null && (
        <Togglable label="Add blog" hideLabel={"Cancel"} ref={blogFormRef}>
          <BlogFrom />
        </Togglable>
      )}
      <h2>Blogs app made by Alexis Ruiz</h2>
      <div className={styles.blogs_container}>
        <BlogList />
      </div>
    </div>
  );
}

export default App;
