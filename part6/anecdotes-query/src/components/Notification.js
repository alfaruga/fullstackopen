import { useContext, useReducer } from "react";
import appContext from "../context/appContext";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      state = `${action.payload}`;
      return state;
      case "CLEAR":
      state = false;
      return state;
    default:
      return state;
  }
};

const Notification = () => {
const [notification, notificationDispatch]= useReducer(notificationReducer, 'Hello')
const [message, messageDispatch] = useContext(appContext)


  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;

  return <div  style={style}>{message}</div>;
};

export default Notification;
