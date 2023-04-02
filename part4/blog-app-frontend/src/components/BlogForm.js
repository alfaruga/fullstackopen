import { useState } from "react";
import styles from "./BlogForm.module.css";

const BlogFrom = ({ addBlogHandler }) => {
  const [newBlog, setNewBlog] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    await addBlogHandler(newBlog, newUrl, newAuthor);
    setNewBlog("");
    setNewUrl("");
    setNewAuthor("");
  };

  return (
    <form className={styles.std_container} onSubmit={submitHandler}>
      <div className={styles.std_input}></div>
      <label for="title">Title:</label>
      <input
        id="title"
        type="text"
        value={newBlog}
        onChange={(event) => {
          setNewBlog(event.target.value);
        }}
      ></input>
      <label for="url">url:</label>
      <input
        id="url"
        type="text"
        value={newUrl}
        onChange={(event) => {
          setNewUrl(event.target.value);
        }}
      ></input>
      <label for="author">Author:</label>
      <input
        id="author"
        type="text"
        value={newAuthor}
        onChange={(event) => {
          setNewAuthor(event.target.value);
        }}
      ></input>
      <button type="submit" className={styles.form_button}>
        Submit
      </button>
    </form>
  );
};

export default BlogFrom;
