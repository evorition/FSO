const { MONGODB_URL } = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const app = express();

mongoose.set("strictQuery", false);

const mongoUrl = MONGODB_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.getTokenFrom);
app.use("/api/login/", loginRouter);
app.use("/api/blogs/", blogsRouter);
app.use("/api/users/", usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
