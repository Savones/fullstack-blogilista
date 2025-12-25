const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  likes = 0
  blogs.forEach((blog) => likes += blog.likes)
  return likes
}

const favoriteBlog = (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes)[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}