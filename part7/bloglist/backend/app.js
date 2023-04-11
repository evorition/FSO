const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const { MONGODB_URL } = require("./utils/config");
const middleware = require("./utils/middleware");

const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const app = express();

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error(`error connection to MongoDB ${error.message}`);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.logger);

app.use("/api/login/", loginRouter);
app.use("/api/blogs/", blogsRouter);
app.use("/api/users/", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
