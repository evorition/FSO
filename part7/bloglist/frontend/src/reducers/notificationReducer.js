import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: "info" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotificaton(state, action) {
      return initialState;
    },
  },
});

export const displayNotification = (message, type = "info") => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(removeNotificaton());
    }, 5000);
  };
};

export const { setNotification, removeNotificaton } = notificationSlice.actions;
export default notificationSlice.reducer;
