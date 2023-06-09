import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserHeader.module.css";
import { clearUserAction } from "../reducers/userReducer";

const UserHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  return (
    <>
      {user !== null && (
        <>
          <h3>{user.username}</h3>
          <button
            onClick={() => {
              dispatch(clearUserAction());
            }}
            className={styles.logout_button}
          >
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default UserHeader;
