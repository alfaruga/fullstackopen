import styles from "./App.module.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import loginService from "./services/login";
import blogService from "./services/blog";
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [blogsInDb, setBlogsInDb] = useState("");

  useEffect(() => {
    blogService.getBlogs().then((response) => {
      setBlogsInDb(response);
    });
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Clicked log in");
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div className={styles.App}>
      <header className="header">
        <div className={styles.header}>
          <h1 className={styles.title}>Blogs app</h1>
        </div>
      </header>

      <form className={styles.std_container} onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className={styles.std_input}>
          <label for="username"> </label>
          Username
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div className={styles.std_input}>
          <label for="password"> </label>
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button type="submit" style={{ marginLeft: "23px", width: "50px" }}>
          Login
        </button>
      </form>

      <div className={styles.blogs_container}>
        <ul className={styles.blogs_list}>
          {blogsInDb.map((blog) => (
            <li className={styles.blog_title}>{blog.title}</li>
          ))}
        </ul>
      </div>
      <div className={styles.std_container}>
        <form onSubmit={() => alert("Submit")}>
          <div className={styles.std_input}></div>
          <label for="title">Title:</label>
          <input id="title" type="text"></input>
          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
