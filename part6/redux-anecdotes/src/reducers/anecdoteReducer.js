import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload));
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
export default anecdotesSlice.reducer;
