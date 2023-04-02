import styles from "./BlogList.module.css";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, deleteBlogHandler }) => {
  return (
    <ul className={styles.blogs_list}>
      {blogs.map((blog) => {
        return (
          <BlogItem
            key={blog.id}
            blog={blog}
            deleteBlogHandler={deleteBlogHandler}
          ></BlogItem>
        );
      })}
    </ul>
  );
};

export default BlogList;
