import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import userService from "../services/user";

import { displayNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    resetUser(state, action) {
      return null;
    },
  },
});

export const loadUser = () => {
  return (dispatch) => {
    const user = userService.getUser();
    dispatch(setUser(user));
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);

      dispatch(setUser(user));
      dispatch(displayNotification(`${user.name} logged in`));
    } catch (exception) {
      dispatch(displayNotification("wrong username or password", "error"));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(resetUser());
    userService.clearUser();
  };
};

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
