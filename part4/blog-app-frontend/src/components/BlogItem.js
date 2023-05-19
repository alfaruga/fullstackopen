import styles from "./BlogItem.module.css";
import Togglable from "./Togglable";
import {  React } from "react";

const BlogItem = ({ blog, deleteBlogHandler, likesHandler, activeUser }) => {
  return (
    <div className={styles.blog_container}>
      <li className={styles.blog_title}>
        {`${blog.title} by ${blog.author}`}
        <Togglable hideLabel={"Hide details"} label={"View details"}>
          {[blog.url, blog.user.username].map((detail) => (
            <p key={Math.random()*100} className={styles.detail}>{detail}</p>
          ))}
          <span>Likes {blog.likes}</span>
          <button id="like-button"
            onClick={() =>
              likesHandler(
                blog.id,
                blog.user,
                blog.likes,
                blog.author,
                blog.title,
                blog.url
              )
            }
          >Like</button>
        </Togglable>
      </li>
      {activeUser===blog.user.username?<button
        onClick={() => deleteBlogHandler(blog.id)}
        className={`${styles.logout_button} ${styles.list_button}`}
      >
        Delete blog
      </button>:<></>}
      
    </div>
  );
};

export default BlogItem;
