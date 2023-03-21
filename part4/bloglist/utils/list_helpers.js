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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authors = blogs.reduce((op, blog) => {
    op[blog.author] = (op[blog.author] ?? 0) + 1;
    return op;
  }, {});
  const author = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );

  return {
    author: author,
    blogs: authors[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
