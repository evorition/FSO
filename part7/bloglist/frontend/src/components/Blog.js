import { useState } from "react";
import { useDispatch } from "react-redux";

import { likeBlog, removeBlog } from "../reducers/blogReducer";

import userService from "../services/user";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = userService.getUser();
  const canRemove = user && user.username === blog.user.username;

  const dispatch = useDispatch();

  const [expand, setExpand] = useState(false);

  const showWhenExpanded = { display: expand ? "" : "none" };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setExpand(!expand)}>
        {expand ? "hide" : "show"}
      </button>
      <div style={showWhenExpanded} className="expanded-blog">
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {canRemove && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
