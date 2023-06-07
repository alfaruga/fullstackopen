import styles from "./BlogList.module.css";
import BlogItem from "./BlogItem";
import {  React } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BlogList = ({ activeUser }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(({blogs})=>{
return [...blogs].sort((a, b)=>b.likes- a.likes)
  })


  
  
  return (
    <ul className={styles.blogs_list}>
      {blogs.map((blog) => {
        return (
          <BlogItem
            key={blog.id}
            blog={blog}
            activeUser={activeUser}
          ></BlogItem>
        );
      })}
    </ul>
  );
};

export default BlogList;
