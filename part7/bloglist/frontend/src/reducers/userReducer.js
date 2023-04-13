import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import storageService from "../services/storage";

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
    const user = storageService.getUser();
    dispatch(setUser(user));
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      storageService.setUser(user);

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
    storageService.clearUser();
  };
};

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
