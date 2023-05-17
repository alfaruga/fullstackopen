import { useState, React } from "react";
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
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={newBlog}
        placeholder="Write in the blog's title"
        onChange={(event) => {
          setNewBlog(event.target.value);
        }}
      ></input>
      <label htmlFor="url">url:</label>
      <input
        id="url"
        type="text"
        value={newUrl}
        placeholder="Type in the url"
        onChange={(event) => {
          setNewUrl(event.target.value);
        }}
      ></input>
      <label htmlFor="author">Author:</label>
      <input
        id="author"
        type="text"
        value={newAuthor}
        placeholder="Enter the author's name"
        onChange={(event) => {
          setNewAuthor(event.target.value);
        }}
      ></input>
      <button type="submit" id="submit-button"className={styles.form_button}>
        Submit
      </button>
    </form>
  );
};

export default BlogFrom;
