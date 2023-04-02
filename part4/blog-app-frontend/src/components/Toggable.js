import { useState, forwardRef, useImperativeHandle } from "react";
import styles from './Toggable.module.css'
const Toggable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false);

  const handleClick = () => setVisibility(!visibility);

  useImperativeHandle(refs, () => {
    return {
      handleClick,
    };
  });
  if (props.condition) {
    return null;
  }
  const content = visibility ? (
    <>
      <button className={`${styles.toggable_button} ${styles.cancel_button}`} onClick={handleClick}>{props.hideLabel}</button>

      {props.children}
      {/*
      Unnecessary since the condition prevents to show it
      {props.children !== null ? (
        <button onClick={handleClick}>cancel</button>
      ) : null} */}
    </>
  ) : (
    <button className={`${styles.toggable_button} ${styles.go_button}`} onClick={handleClick}>{props.label}</button>
  );
  return <>{content}</>;
});

export default Toggable;
