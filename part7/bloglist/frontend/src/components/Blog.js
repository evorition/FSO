import { useState } from "react";

const Blog = ({ blog }) => {
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
          {/* <button onClick={updateLikes}>like</button> */}
        </div>
        <div>{blog.user.name}</div>
        {/* {username === blog.user.username && (
          <button onClick={removeBlog}>remove</button>
        )} */}
      </div>
    </div>
  );
};

export default Blog;
