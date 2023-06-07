import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlogLocal(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    updateBlog(state, action) {
      return state.map((b) =>
        b.id === action.payload.id ? action.payload : b
      );
    },
  },
});

export const initializeBlogsAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const postBlogAction = (content) => {
  return async (dispatch) => {
    const saved = await blogService.create(content);
    const blog = await blogService.getOne(saved.id);
    dispatch(createBlog(blog));
  };
};
export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlogLocal(id));
  };
};
export const likeBlogAction = (id) => {
  return async (dispatch) => {
    console.log('maformated?', id)
    const liked = await blogService.updateBlog(id);
    console.log("liked blog, should have use obj", liked);
    dispatch(updateBlog(liked));
  };
};
export const { createBlog, setBlogs, deleteBlogLocal, updateBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
