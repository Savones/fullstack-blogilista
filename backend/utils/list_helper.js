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

const mostBlogs = (blogs) => {
  help_dict = {}

  blogs.forEach((blog) => {
    if (help_dict[blog.author] === undefined) {
      help_dict[blog.author] = 1
    } else {
      help_dict[blog.author] += 1
    }
  })

  let result = { author: null, blogs: 0 };
  for (author in help_dict) {
    if (help_dict[author] > result.blogs) {
      result = {
        author,
        blogs: help_dict[author]
      }
    }
  }

  if (result.author == null) {
    result = undefined
  }

  return result
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}