import { useState, forwardRef, useImperativeHandle, React } from "react";
import styles from "./Togglable.module.css";

const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false);
  const handleClick = () => setVisibility(!visibility);

  useImperativeHandle(refs, () => {
    return {
      handleClick,
    };
  });

  const content = visibility ? (
    <div className={styles.togglable_container} id="togglable_tests">
      <button
        className={`${styles.toggable_button} ${styles.cancel_button}`}
        onClick={handleClick}
      >
        {props.hideLabel}
      </button>
      {props.children}
    </div>
  ) : (
    <button
      className={`${styles.toggable_button} ${styles.go_button}`}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
  return <>{content}</>;
});
Togglable.displayName = "Togglable";
export default Togglable;
