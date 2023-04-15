import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";

const Blog = () => {
  const blogId = useParams().id;

  const { blog, user } = useSelector(({ blogs, user }) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    return { blog, user };
  });

  const dispatch = useDispatch();

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

  const handleComment = (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    dispatch(commentBlog(blog.id, comment));

    event.target.comment.value = "";
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user && user.username === blog.user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
