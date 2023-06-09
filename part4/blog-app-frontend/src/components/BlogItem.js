import { useDispatch, useSelector } from "react-redux";
import styles from "./BlogItem.module.css";
import Togglable from "./Togglable";
import { React } from "react";
import {
  deleteBlogAction,
  likeBlogAction,
  updateBlog,
} from "../reducers/blogsReducer";

const BlogItem = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  console.log(user);
  return (
    <div className={styles.blog_container}>
      <li className={styles.blog_title}>
        {`${blog.title} by ${blog.author}`}
        <Togglable hideLabel={"Hide details"} label={"View details"}>
          {[blog.url, blog.user.username].map((detail) => (
            <p key={Math.random() * 100} className={styles.detail}>
              {detail}
            </p>
          ))}
          <span>Likes {blog.likes}</span>
          <button
            id="like-button"
            onClick={() => dispatch(likeBlogAction(blog.id))}
          >
            Like
          </button>
        </Togglable>
      </li>
      {user !== null && user.username === blog.user.username ? (
        <button
          onClick={() => dispatch(deleteBlogAction(blog.id))}
          className={`${styles.logout_button} ${styles.list_button}`}
        >
          Delete blog
        </button>
      ) : null}
    </div>
  );
};

export default BlogItem;
