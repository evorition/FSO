const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "My new awesome blog post",
    author: "Abraham Lincoln",
    url: "example.com",
    likes: 23,
  },
  {
    title: "Another awesome blog",
    author: "Winston Churchill",
    url: "example.com",
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
