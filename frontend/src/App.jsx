import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(
          `blog ${returnedBlog.title} by author ${returnedBlog.author} was successfully added.`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const likeBlog = (blogObject) => {
    blogService
      .updateLike(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog =>
          blog.id === returnedBlog.id ? returnedBlog : blog
        ))
        setSuccessMessage(
          `blog ${returnedBlog.title} liked successfully.`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel="new blog">
      <CreateBlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loggedInView = () => (
    <div>
      <button onClick={handleLogOut}>log out</button>
      <br></br>
      <br></br>
      {createBlogForm()}
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={likeBlog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {!user && loginForm()}
      {user && loggedInView()}
    </div>
  )
}

export default App