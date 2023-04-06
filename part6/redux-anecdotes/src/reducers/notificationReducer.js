import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  display: "none",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload,
        display: "",
      };
    },
    removeNotification(state, action) {
      return initialState;
    },
  },
});

export const { setNotification, removeNotification } = filterSlice.actions;

export const displayNotification = (message, timeToWait) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeToWait * 1000);
  };
};

export default filterSlice.reducer;
