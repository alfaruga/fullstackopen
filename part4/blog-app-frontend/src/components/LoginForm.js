import { useState } from "react";
import React from "react";
import styles from "./LoginForm.module.css";
import { loginAction } from "../reducers/userReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const user = useSelector(({ username }) => username);
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();

    const loginCredentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(loginAction(loginCredentials));

    event.target.password.value = "";
    event.target.username.value = "";
  };

  const content = user ? null : (
    <form className={styles.std_container} onSubmit={submitHandler}>
      <h1>Login</h1>
      <div className={styles.std_input}>
        <label htmlFor="username">
          <p>Username</p>
          <input type="text" id="username"></input>
        </label>
      </div>
      <div className={styles.std_input}>
        <label htmlFor="password">
          <p>Password</p>
          <input id="password" type="password"></input>
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
