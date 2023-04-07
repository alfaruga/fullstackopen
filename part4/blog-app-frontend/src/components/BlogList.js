import styles from "./BlogList.module.css";
import BlogItem from "./BlogItem";
import {  React } from "react";

const BlogList = ({ blogs, deleteBlogHandler, likesHandler, activeUser }) => {
  return (
    <ul className={styles.blogs_list}>
      {blogs.sort((a, b)=>b.likes- a.likes).map((blog) => {
        return (
          <BlogItem
            key={blog.id}
            blog={blog}
            deleteBlogHandler={deleteBlogHandler}
            likesHandler={likesHandler}
            activeUser={activeUser}
          ></BlogItem>
        );
      })}
    </ul>
  );
};

export default BlogList;
