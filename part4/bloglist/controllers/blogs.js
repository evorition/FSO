const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  const user = request.user;
  const blog = await new Blog({ ...request.body, user: user._id }).populate(
    "user",
    { username: 1, name: 1 }
  );

  try {
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = { ...request.body };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate("user", { username: 1, name: 1 });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    await Blog.findByIdAndRemove(blog._id);
    user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString());
    await user.save();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
