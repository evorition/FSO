import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload.sort((a1, a2) => a2.votes - a1.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const id = action.payload.id;
      const anecdotesToReturn = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
      return anecdotesToReturn.sort((a1, a2) => a2.votes - a1.votes);
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdotesService.getAnecdotes();
    dispatch(setAnecdotes(initialAnecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const likeAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdotesSlice.reducer;
