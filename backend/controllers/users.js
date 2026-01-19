const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { populate } = require('dotenv')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!password) {
    return response.status(400).json({
      error: 'password missing'
    })
  } else if (username.length < 3) {
    return response.status(400).json({
      error: 'username has to be minimum 3 characters'
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'password has to be minimum 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })

  response.json(users)
})

module.exports = usersRouter