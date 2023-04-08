import { useQuery, useMutation, useQueryClient } from "react-query";

import { getAnecdotes, updateAnecdote } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useNotificationDispatch } from "./NotificatonContext";

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const result = useQuery("anecdotes", getAnecdotes, {
    fetchOnWindowFocus: false,
    retry: false,
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SET", payload: `anecdote '${anecdote.content}' voted` });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
