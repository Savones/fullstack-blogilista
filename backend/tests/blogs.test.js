const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithOneBlogAndZeroLikes = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  }
]

const twoBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when blog has zero likes equals to zero', () => {
    const result = listHelper.totalLikes(listWithOneBlogAndZeroLikes)
    assert.strictEqual(result, 0)
  })

  test('when multiple blogs equals to total', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 38)
  })

  test('when no blogs equals to zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  test('when list has one blog returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when two blogs has same amount of likes returns first of them', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('when no blogs return nothing', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, undefined)
  })
})

describe('most blogs', () => {
  test('when most blogs returns correct author', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result.author, "Robert C. Martin")
  })

  test('when most blogs returns correct blog amount', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result.blogs, 3)
  })

  test('when many authors have most blogs returns one author name', () => {
    const result = listHelper.mostBlogs(twoBlogs)
    assert.strictEqual(result.author, "Michael Chan")
  })

  test('when many authors have most blogs returns one blog amount', () => {
    const result = listHelper.mostBlogs(twoBlogs)
    assert.strictEqual(result.blogs, 1)
  })

  test('when no blogs returns undefined', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, undefined)
  })
})

describe('most likes', () => {
  test('when most likes returns correct author', () => {
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result.author, "Edsger W. Dijkstra")
  })

  test('when most likes returns correct like amount', () => {
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result.likes, 17)
  })

  test('when many authors have most likes returns one author name', () => {
    const result = listHelper.mostLikes(twoBlogs)
    assert.strictEqual(result.author, "Michael Chan")
  })

  test('when many authors have most likes returns one like amount', () => {
    const result = listHelper.mostLikes(twoBlogs)
    assert.strictEqual(result.likes, 7)
  })

  test('when no blogs returns undefined', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, undefined)
  })
})