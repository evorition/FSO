import { useState } from "react";

const Blog = ({ blog, username, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expand, setExpand] = useState(false);

  const showWhenExpanded = { display: expand ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div className="compact-blog">
        {blog.title} {blog.author}
        <button onClick={() => setExpand(!expand)}>
          {expand ? "hide" : "show"}
        </button>
      </div>
      <div style={showWhenExpanded} className="expanded-blog">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {username === blog.user.username && (
          <button onClick={removeBlog}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
