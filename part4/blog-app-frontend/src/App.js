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
import {
  clearNotification,
  setNotification,
} from "./reducers/notificationReducer";
import { setBlogsInDB, initializeBlogsAction } from "./reducers/blogsReducer";
import { useSelector } from "react-redux";

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [blogsInDb, setBlogsInDb] = useState([]);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogsAction());
  }, [dispatch, ]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setTimeout(() => {
        dispatch(clearNotification());
        setError(false);
      }, 5000);

      setUser(user);
      setTimeout(() => {
        window.localStorage.clear();
        setUser(null);
      }, 3600000);
    } catch (exception) {
      setError(true);
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setError(false);
        setErrorMessage(null);
      }, 5000);
    }
  };
  const addBlogHandler = async (newBlog, newUrl, newAuthor) => {
    blogFormRef.current.handleClick();
    const blogToPost = {
      title: newBlog,
      url: newUrl,
      author: newAuthor,
    };
    try {
      await blogService.create(blogToPost);
      const updatedBlogs = await blogService.getAll();
      setBlogsInDb(updatedBlogs);

      setErrorMessage(`new blog: ${newBlog} added`);
      setTimeout(() => {
        setErrorMessage(null);
        setError(false);
      }, 5000);
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setError(false);
        setErrorMessage(null);
      }, 5000);
    }
  };
  
  const likesHandler = async (blogid) => {
    try {
      await blogService.updateBlog(blogid);
      const updatedList = await blogService.getAll();

      setBlogsInDb(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.App}>
      <Notification message={errorMessage} error={error} />
      <header className="header">
        <div className={styles.header}>
          <h1 className={styles.title}>Blogs app</h1>
        </div>
      </header>

      {user !== null && <UserHeader user={user} setUser={setUser} />}
      <Togglable label="login" hideLabel={"Cancel"} condition={user}>
        <LoginForm handleLogin={handleLogin} showLogin={user} />
      </Togglable>
      <Togglable
        label="Add blog"
        condition={!user}
        hideLabel={"Cancel"}
        ref={blogFormRef}
      >
        <BlogFrom addBlogHandler={addBlogHandler} />
      </Togglable>
      <h2>Blogs app made by Alexis Ruiz</h2>
      <div className={styles.blogs_container}>
        <BlogList
          likesHandler={likesHandler}
          activeUser={user ? user.username : null}
        />
      </div>
    </div>
  );
}

export default App;
