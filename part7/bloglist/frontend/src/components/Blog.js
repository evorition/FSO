import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

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
        <Button size="sm" onClick={handleLike}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      {user && user.username === blog.user.username && (
        <Button size="sm" variant="danger" onClick={handleRemove}>
          remove
        </Button>
      )}
      <h3>Comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Control className="mb-3 w-25" type="text" name="comment" />
        <Button size="sm" type="submit">
          add comment
        </Button>
      </Form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
