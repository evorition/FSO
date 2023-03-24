const { MONGODB_URL } = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

const app = express();

mongoose.set("strictQuery", false);

const mongoUrl = MONGODB_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs/", blogsRouter);
app.use("/api/users/", usersRouter);
app.use(middleware.errorHandler);

module.exports = app;
