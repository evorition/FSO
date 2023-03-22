const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: "Title is required" },
  author: String,
  url: { type: String, required: "URL is required" },
  likes: { type: Number, default: 0 },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("blog", blogSchema);
