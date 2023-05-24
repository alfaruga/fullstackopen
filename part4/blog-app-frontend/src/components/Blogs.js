import { useDispatch, useSelector } from "react-redux";
import { likesHandler } from "../reducers/blogReducer";
import styles from "./Blogs.module.css";

const BlogItem = ({ blog, deleteBlogHandler, likesHandler, activeUser }) => {
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
            onClick={() =>
              likesHandler(
                blog.id
              )
            }
          >
            Like
          </button>
        </Togglable>
      </li>
      {activeUser === blog.user.username ? (
        <button
          onClick={() => deleteBlogHandler(blog.id)}
          className={`${styles.logout_button} ${styles.list_button}`}
        >
          Delete blog
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state);

  return (
    <ul className={styles.blogs_list}>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return (
            <BlogItem
              key={blog.id}
              blog={blog}
             /*  
             To be updated to use Redux
             deleteBlogHandler={deleteBlogHandler}
              likesHandler={likesHandler}
              activeUser={activeUser} */
              likesHandler={()=>dispatch(likesHandler)}
            ></BlogItem>
          );
        })}
    </ul>
  );
};

export default BlogsList
