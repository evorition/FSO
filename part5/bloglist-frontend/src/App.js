import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [info, setInfo] = useState({ message: null });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const showNotification = (message, type = "info") => {
    setInfo({ message, type });

    setTimeout(() => {
      setInfo({ message: null });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification("wrong username or password", "error");
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
    showNotification(
      `a new blog ${blogObject.title} by ${blogObject.author} added`
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
    setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)));
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification info={info} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <Toggleable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Toggleable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => updateLikes(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
