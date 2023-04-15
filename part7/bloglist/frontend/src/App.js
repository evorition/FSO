import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";

import { initializeBlogs } from "./reducers/blogReducer";
import { loadUser, logout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <div style={{ backgroundColor: "grey", padding: 4, marginBottom: 8 }}>
        <Link style={{ padding: 2 }} to="/">
          blogs
        </Link>
        <Link style={{ padding: 2 }} to="/users">
          users
        </Link>
        {user.name} logged in
        <button style={{ margin: 2 }} onClick={handleLogout}>
          logout
        </button>
      </div>
      <h2>blogs</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
