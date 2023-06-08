import { useSelector } from "react-redux";
import styles from "./Notification.module.css";
import { React } from "react";

const Notification = () => {
  const state  = useSelector((state=>state.notification));
  const style = state.error ? "errorMessage" : "successMessage";

  return state.message ? (
    <div className={styles[style]}>{state.message}</div>
  ) : null;
};

export default Notification;
