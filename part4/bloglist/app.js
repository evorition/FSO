const { MONGODB_URL } = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const app = express();

const mongoUrl = MONGODB_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs/", blogsRouter);
app.use(middleware.errorHandler);

module.exports = app;
