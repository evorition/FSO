import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { displayNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(displayNotification(`${user.name} logged in`));
    } catch (exception) {
      dispatch(displayNotification("wrong username or password", "error"));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm onLogin={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
