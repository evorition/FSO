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

export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
