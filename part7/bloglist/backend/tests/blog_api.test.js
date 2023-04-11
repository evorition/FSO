const supertest = require("supertest");
const mongoose = require("mongoose");

const helper = require("./test_helper");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("when there is some blogs initially", () => {
  let token;

  beforeAll(async () => {
    await helper.createUser();

    const response = await api
      .post("/api/login")
      .send({ username: "test", password: "password" });
    token = response.body.token;
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs returned as json and have the same length", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blog object have id property", async () => {
    const responseBlogs = await api.get("/api/blogs");

    expect(responseBlogs.body[0].id).toBeDefined();
  });

  describe("adding new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "Test blog",
        author: "Linus Torvalds",
        url: "example.com",
        likes: 14,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.blogsInDb();

      expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogs.map((blog) => blog.title);
      expect(titles).toContain("Test blog");
    });

    test("without likes defaults to 0 likes", async () => {
      const newBlogWithoutLikes = {
        title: "Blog without likes",
        author: "Ryan Gosling",
        url: "example.com",
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlogWithoutLikes);
      const likes = response.body.likes;

      expect(likes).toBe(0);
    });

    test("without title returns 400 status code", async () => {
      const blogPostWithoutTitle = {
        author: "Barack Obama",
        url: "example.com",
        likes: 12,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogPostWithoutTitle)
        .expect(400);
    });

    test("without URL returns 400 status code", async () => {
      const blogPostWithoutUrl = {
        title: "Without url",
        author: "Barack Obama",
        likes: 12,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogPostWithoutUrl)
        .expect(400);
    });

    test("without token returns 401 Unauthorized", async () => {
      const blogPostWithoutUrl = {
        title: "Test blog",
        author: "Linus Torvalds",
        url: "example.com",
        likes: 14,
      };

      await api.post("/api/blogs").send(blogPostWithoutUrl).expect(401);
    });
  });

  describe("deletion of a blog", () => {
    test("succeed with 204 status code if it's valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((blog) => blog.title);

      expect(titles).not.toContain("My new awesome blog post");
    });
  });

  describe("updating blog", () => {
    test("succeeds with valid data", async () => {
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
  });
});

describe("when initially there is one user in db", () => {
  beforeEach(async () => {
    await helper.createUser();
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
