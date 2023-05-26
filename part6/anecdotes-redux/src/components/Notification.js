import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.message;
  });

  const style = {
    border: "solid",
    backgroundColor: "#ccc",
    padding: 10,
    borderWidth: 1,
  };
  if (!notification) {
    style.display = "none";
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
