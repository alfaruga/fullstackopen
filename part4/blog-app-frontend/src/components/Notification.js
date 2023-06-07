import { useSelector } from "react-redux";
import styles from "./Notification.module.css";
import { React } from "react";

const Notification = () => {
  const state  = useSelector((state=>state.notification));
  console.log("from notification",state)
  console.log('this should be rendered', state.message)
  console.log('this is the error', state.error)
  const style = state.error ? "errorMessage" : "successMessage";

  return state.message ? (
    <div className={styles[style]}>{state.message}</div>
  ) : null;
};

export default Notification;
