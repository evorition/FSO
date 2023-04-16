import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./components/Home";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import NavBar from "./components/NavBar";

import { initializeBlogs } from "./reducers/blogReducer";
import { loadUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  if (user === null) {
    return (
      <Container>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </Container>
    );
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
