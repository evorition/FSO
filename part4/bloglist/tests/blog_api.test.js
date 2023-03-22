const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeAll(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs returned as json and have the same length", async () => {
  const responseBlogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(responseBlogs.body).toHaveLength(helper.initialBlogs.length);
});

test("blog objects should have id property", async () => {
  const responseBlogs = await api.get("/api/blogs");

  expect(responseBlogs.body[0].id).toBeDefined();
});

test("valid blog can be added", async () => {
  const newBlog = {
    title: "Test blog",
    author: "Linus Torvalds",
    url: "example.com",
    likes: 14,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogs.map((blog) => blog.title);
  expect(titles).toContain("Test blog");
});

test("blog post without likes should default to 0 likes", async () => {
  const newBlogWithoutLikes = {
    title: "Blog without likes",
    author: "Ryan Gosling",
    url: "example.com",
  };

  const response = await api.post("/api/blogs").send(newBlogWithoutLikes);
  const likes = response.body.likes;

  expect(likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
