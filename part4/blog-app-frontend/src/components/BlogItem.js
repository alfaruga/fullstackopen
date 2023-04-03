import styles from "./BlogItem.module.css";
import Toggable from "./Toggable";
const BlogItem = ({ blog, deleteBlogHandler, likesHandler, activeUser }) => {
  return (
    <div className={styles.blog_container}>
      <li className={styles.blog_title}>
        {blog.title}
        <Toggable hideLabel={"Hide details"} label={"View details"}>
          {[blog.url, blog.author, blog.user.username].map((detail) => (
            <p className={styles.detail}>{detail}</p>
          ))}
          <span>Likes {blog.likes}</span>
          <button
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
          >
            Like
          </button>
        </Toggable>
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
