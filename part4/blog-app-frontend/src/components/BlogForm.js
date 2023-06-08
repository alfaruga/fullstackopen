import { React } from "react";
import styles from "./BlogForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postBlogAction } from "../reducers/blogsReducer";

const BlogFrom = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const makeBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: event.target.title.value,
      url: event.target.url.value,
      author: event.target.author.value,
    };
    dispatch(postBlogAction(blog));
    event.target.title.value = "";
    event.target.url.value = "";
    event.target.author.value = "";
  };

  return (
    <>
      {user !== null && (
        <form className={styles.std_container} onSubmit={makeBlog}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Write in the blog's title"
          ></input>
          <label htmlFor="url">url:</label>
          <input id="url" type="text" placeholder="Type in the url"></input>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            placeholder="Enter the author's name"
          ></input>
          <button
            type="submit"
            id="submit-button"
            className={styles.form_button}
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default BlogFrom;
