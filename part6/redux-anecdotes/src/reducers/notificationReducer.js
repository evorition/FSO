import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  display: "none",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    showNotification(state, action) {
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

export const displayNotification = (message) => (dispatch) => {
  dispatch(showNotification(message));
  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);
};

export const { showNotification, removeNotification } = filterSlice.actions;
export default filterSlice.reducer;
