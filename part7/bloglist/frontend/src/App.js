import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { displayNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(displayNotification(`${user.name} logged in`));
    } catch (exception) {
      dispatch(displayNotification("wrong username or password", "error"));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const createBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);

    setBlogs(blogs.concat(returnedBlog));
    blogFormRef.current.toggleVisibility();
    dispatch(
      displayNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    );
  };

  const updateLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updateBlog = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    const returnedBlog = await blogService.update(id, updateBlog);
    const sortedBlogs = blogs
      .map((b) => (b.id !== id ? b : returnedBlog))
      .sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };

  const removeBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );
    if (ok) {
      await blogService.remove(id);

      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
            updateLikes={() => updateLikes(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
