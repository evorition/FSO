const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
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

test("blog post without title  should return 400", async () => {
  const blogPostWithoutTitle = {
    author: "Barack Obama",
    url: "example.com",
    likes: 12,
  };

  await api.post("/api/blogs").send(blogPostWithoutTitle).expect(400);
});

test("blog posts without URL should return 400", async () => {
  const blogPostWithoutUrl = {
    title: "Without url",
    author: "Barack Obama",
    likes: 12,
  };

  await api.post("/api/blogs").send(blogPostWithoutUrl).expect(400);
});

test("deletion of a blog succeed with 204 status code", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(titles).not.toContain("My new awesome blog post");
});

test("successfully updates existing blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 32,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  const updatedBlogLikes = blogsAtEnd[0].likes;

  expect(updatedBlogLikes).toBe(32);
});

describe("when initially there is one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany();

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({
      name: "Test User",
      username: "test",
      passwordHash,
    });

    await user.save();
  });

  test("creation succeeds with new username and correct password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { name: "New User", username: "new", password: "pass" };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { name: "New User", username: "test", password: "pass" };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { name: "New User", username: "new", password: "12" };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    console.log(result.body.error);
    expect(result.body.error).toContain(
      "Password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
