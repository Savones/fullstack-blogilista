const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.includes('My first blog'))
})

test('blog has a id field and not _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert(blog.id !== undefined)
    assert(blog._id === undefined)
  })
})

test('posting a blog adds one blog to all blogs', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'New blog post',
      author: 'Hemmo Herhäläinen',
      url: "newblog.fi",
      likes: 19
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('New blog post'))
})

test('if blogs like amount is not given assert it to zero', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'New blog post',
      author: 'Hemmo Herhäläinen',
      url: "blogtest.fi"
    })

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test('if blog has no title returns 400 bad request', async () => {
  await api
    .post('/api/blogs')
    .send({
      author: 'Hemmo Herhäläinen',
      url: "blogtest.fi",
      likes: 6
    })
    .expect(400)
})

test('if blog has no url returns 400 bad request', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: "New blog",
      author: 'Hemmo Herhäläinen',
      likes: 6
    })
    .expect(400)
})

test('a blog can be deleted', async () => {
  const response = await api.get('/api/blogs')

  await api
    .delete(`/api/blogs/${response.body[0].id}`)
    .expect(204)

  const responseAfter = await api.get('/api/blogs')
  const titles = responseAfter.body.map(n => n.title)
  assert(!titles.includes('My first blog'))

  assert.strictEqual(responseAfter.body.length, 1)
})

test('blog likes can be updated', async () => {
  const response = await api.get('/api/blogs')

  await api
    .put(`/api/blogs/${response.body[0].id}`)
    .send({
      likes: 100
    })

  const afterResponse = await api.get('/api/blogs')
  const updatedBlog = afterResponse.body[0]
  assert.strictEqual(updatedBlog.likes, 100)
})

after(async () => {
  await mongoose.connection.close()
})