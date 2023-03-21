const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikedBlog = null;
  let mostLikes = 0;

  for (const blog of blogs) {
    if (blog.likes >= mostLikes) {
      mostLikes = blog.likes;
      mostLikedBlog = blog;
    }
  }

  return mostLikedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
