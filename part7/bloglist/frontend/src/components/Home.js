import { useRef } from "react";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";

const Home = () => {
  const blogFormRef = useRef();

  return (
    <>
      <h1>Blogs</h1>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  );
};

export default Home;
