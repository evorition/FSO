import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

import { displayNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    replaceBlog(state, action) {
      const replaced = action.payload;
      return state.map((s) => (s.id !== replaced.id ? s : replaced));
    },
    deleteBlog(state, action) {
      console.log(action.payload);
      const id = action.payload;
      return state.filter((s) => s.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(object);
      dispatch(addBlog(blog));
      dispatch(
        displayNotification(`a new blog ${blog.title} by ${blog.author} added`)
      );
    } catch (error) {
      dispatch(displayNotification(error.response.data.error, "error"));
    }
  };
};

export const likeBlog = (object) => {
  return async (dispatch) => {
    const toLike = { ...object, likes: object.likes + 1 };
    const updatedBlog = await blogService.update(toLike);
    dispatch(replaceBlog(updatedBlog));
    dispatch(
      displayNotification(
        `A like for the blog '${updatedBlog.title}' by ${updatedBlog.author}`
      )
    );
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(deleteBlog(blog.id));
    dispatch(
      displayNotification(`The blog '${blog.title}' by ${blog.author} removed`)
    );
  };
};

export const { setBlogs, addBlog, replaceBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
