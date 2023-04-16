import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((b1, b2) => b2.likes - b1.likes);
  });

  return (
    <Table striped bordered>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
