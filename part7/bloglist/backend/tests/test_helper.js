const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const createUser = async () => {
  await User.deleteMany();

  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({
    name: "Test User",
    username: "test",
    passwordHash,
  });

  await user.save();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  createUser,
};
