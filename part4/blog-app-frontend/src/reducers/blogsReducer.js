import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";
import { setNotificationAction } from "./notificationReducer";

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
      console.log("from the actions", action.payload);
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
    try {
      const saved = await blogService.create(content);
      const formatedBlog = await blogService.getOne(saved.id);
      dispatch(createBlog(formatedBlog));
      dispatch(
        setNotificationAction({
          message: `${saved.title} succesfuly saved`,
          error: false,
        })
      );
    } catch (error) {
      dispatch(
        setNotificationAction({
          message: error.response.data.error,
          error: true,
        })
      );
    }
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
    await blogService.updateBlog(id);
    const formatedBlog = await blogService.getOne(id);
    dispatch(updateBlog(formatedBlog));
  };
};
export const { createBlog, setBlogs, deleteBlogLocal, updateBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
