import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
    likeAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToLike = state.find((anecdote) => anecdote.id === id);
      const likedAnecdote = {
        ...anecdoteToLike,
        votes: anecdoteToLike.votes + 1,
      };
      const anecdotesToReturn = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : likedAnecdote
      );
      return anecdotesToReturn.sort((a1, a2) => a2.votes - a1.votes);
    },
  },
});

export const { setAnecdotes, createAnecdote, likeAnecdote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdotesService.getAnecdotes();
    dispatch(setAnecdotes(initialAnecdotes));
  };
};

export default anecdotesSlice.reducer;
