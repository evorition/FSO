import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = (event) => {
    event.preventDefault();

    dispatch(createBlog({ title, author, url }));

    setTitle("");
    setAuthor("");
    setUrl("");

    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group className="mb-3 w-25">
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-25">
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-25">
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button id="create-button" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
