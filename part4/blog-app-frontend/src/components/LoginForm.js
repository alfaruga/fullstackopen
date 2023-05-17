import {  useState } from "react";
import React from "react";
import styles from "./LoginForm.module.css";

const LoginForm = ({ handleLogin, showLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    await handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  const content = showLogin ? null : (
    <form className={styles.std_container} onSubmit={submitHandler}>
      <h1>Login</h1>
      <div className={styles.std_input}>
        <label htmlFor="username">
          <p>Username</p>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </label>
      </div>
      <div className={styles.std_input}>
        <label htmlFor="password">
          <p>Password</p>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </label>
      </div>
      <button type="submit" id="login-button" className={styles.form_button}>
        Login
      </button>
    </form>
  );
  return content;
};

export default LoginForm;
