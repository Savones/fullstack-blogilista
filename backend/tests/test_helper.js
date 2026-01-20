const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'My first blog',
    author: "Mikko Rantanen",
    url: "firstblog.fi",
    likes: 5
  },
  {
    title: 'Another blog',
    author: "Maija Meikäläinen",
    url: "secondblog.com",
    likes: 0
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginUser = async () => {
  await api.post('/api/users')
    .send({ username: "username", name: "name", password: "password" })

  const response = await api
    .post('/api/login')
    .send({ username: "username", password: "password" })

  return response.body.token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  loginUser
}