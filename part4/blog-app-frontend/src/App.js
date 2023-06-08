import styles from "./App.module.css";

import React from "react";
import { useState, useEffect, useRef } from "react";

import loginService from "./services/login";
import blogService from "./services/blog";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogFrom from "./components/BlogForm";
import UserHeader from "./components/UserHeader";
import BlogList from "./components/BlogList";
import { useDispatch } from "react-redux";
import { setNotificationAction } from "./reducers/notificationReducer";
import { initializeBlogsAction } from "./reducers/blogsReducer";

function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogsAction());
  }, [dispatch]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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

      {user !== null && <UserHeader user={user} setUser={setUser} />}
      <Togglable
        ref={loginFormRef}
        label="login"
        hideLabel={"Cancel"}
      >
        <LoginForm  />
      </Togglable>
      <Togglable
        label="Add blog"
        hideLabel={"Cancel"}
        ref={blogFormRef}
      >
        <BlogFrom />
      </Togglable>
      <h2>Blogs app made by Alexis Ruiz</h2>
      <div className={styles.blogs_container}>
        <BlogList activeUser={user ? user.username : null} />
      </div>
    </div>
  );
}

export default App;
