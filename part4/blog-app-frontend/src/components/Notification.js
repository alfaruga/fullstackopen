import styles from "./Notification.module.css";
import {  React } from "react";

const Notification = ({ message, error }) => {
  const style = error ? "errorMessage" : "successMessage";

  return message ? <div className={styles[style]}>{message}</div> : null;
};

export default Notification;
