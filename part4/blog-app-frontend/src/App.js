import styles from "./App.module.css";

import React from "react";
import { useState, useEffect, useRef } from "react";

import loginService from "./services/login";
import blogService from "./services/blog";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Toggable from "./components/Toggable";
import BlogFrom from "./components/BlogForm";
import UserHeader from "./components/UserHeader";
import BlogList from "./components/BlogList";

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [blogsInDb, setBlogsInDb] = useState([]);
  const [error, setError] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogsInDb(response);
    });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggeedBlogUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggeedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);

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
  const deleteBlogHandler = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const newList = blogsInDb.filter((blog) => id !== blog.id);

      setBlogsInDb(newList);
      setErrorMessage("Blog succesfully deleted from DB");
      setTimeout(() => {
        setErrorMessage(null);
        setError(false);
      }, 5000);
    } catch (error) {
      alert("something went wrong couldn't delete");
    }
  };
  const likesHandler = async (blogid, user, likes, author, title, url) => {
    const blogToUpdate = {
      user: user.id,
      likes: likes + 1,
      author: author,
      title: title,
      url: url,
    };

    try {
      const updatedBlog = await blogService.updatedBlog(blogid, blogToUpdate);
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
      <Toggable label="login" hideLabel={"Cancel"} condition={user}>
        <LoginForm handleLogin={handleLogin} showLogin={user} />
      </Toggable>
      <Toggable
        label="Add blog"
        condition={!user}
        hideLabel={"Cancel"}
        ref={blogFormRef}
      >
        <BlogFrom addBlogHandler={addBlogHandler} />
      </Toggable>
      <h2>Blogs</h2>
      <div className={styles.blogs_container}>
        <BlogList
          blogs={blogsInDb}
          deleteBlogHandler={deleteBlogHandler}
          likesHandler={likesHandler}
          activeUser={user?user.username:null}
        />
      </div>
    </div>
  );
}

export default App;
