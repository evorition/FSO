const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const blog = await new Blog({
    ...request.body,
  }).populate("user", { username: 1, name: 1 });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  blog.user = user._id;

  let createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  createdBlog = await Blog.findById(createdBlog._id).populate("user");

  response.status(201).json(createdBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = { ...request.body };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user");

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const user = request.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString());

  await user.save();
  await blog.remove();

  response.status(204).end();
});

module.exports = blogsRouter;
