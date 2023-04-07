import {  React } from "react";

import styles from './UserHeader.module.css'
const UserHeader = ({user, setUser})=>{

    return( <>
        <h3>{user.username}</h3>
        <button
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
          className={styles.logout_button}
        >
          Logout
        </button>
      </>)
}

export default UserHeader