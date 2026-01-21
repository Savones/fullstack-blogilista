const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user

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

  const populatedResult = await Blog.findById(blog._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedResult)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user
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
  const populatedResult = await Blog.findById(blog._id).populate('user', { username: 1, name: 1 })
  response.json(populatedResult)
})

module.exports = blogsRouter