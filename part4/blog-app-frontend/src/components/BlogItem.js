import styles from "./BlogItem.module.css";
import Toggable from "./Toggable";
const BlogItem = ({ blog, deleteBlogHandler }) => {
  return (
    <div className={styles.blog_container}>
      <li className={styles.blog_title}>
        {blog.title}
        <Toggable
          hideLabel={"Hide details"}
          label={"View details"}
        >
          {[blog.url, blog.likes, blog.author, blog.user.username].map((detail) => (
            <p className={styles.detail}>{detail}</p>
          ))}
        </Toggable>
      </li>
      <button
        onClick={() => deleteBlogHandler(blog.id)}
        className={`${styles.logout_button} ${styles.list_button}`}
      >
        Delete blog
      </button>
    </div>
  );
};

export default BlogItem;
