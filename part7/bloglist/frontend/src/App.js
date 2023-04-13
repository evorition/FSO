import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

import loginService from "./services/login";
import userService from "./services/user";

import { displayNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const user = userService.getUser();
    setUser(user);
  }, []);

  const blogFormRef = useRef();

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      userService.setUser(user);
      dispatch(displayNotification(`${user.name} logged in`));
    } catch (exception) {
      dispatch(displayNotification("wrong username or password", "error"));
    }
  };

  const handleLogout = () => {
    setUser(null);
    userService.clearUser();
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
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
