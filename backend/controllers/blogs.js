const blogsRouter = require('express').Router()
const { resource } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end()
  }

  if (request.body.likes === undefined) {
    blog.likes = 0
  }

  blog.user = user._id

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const userid = user.id
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === userid.toString()) {
    await blog.deleteOne()
  } else {
    return response.status(400).json({ error: 'logged in user different than blog owner' })
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  blog.likes = body.likes
  const result = await blog.save()
  response.json(result)
})

module.exports = blogsRouter