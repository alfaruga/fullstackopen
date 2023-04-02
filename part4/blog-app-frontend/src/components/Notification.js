import styles from "./Notification.module.css";

const Notification = ({ message, error }) => {
  const style = error ? "errorMessage" : "successMessage";

  return message ? <div className={styles[style]}>{message}</div> : null;
};

export default Notification;
