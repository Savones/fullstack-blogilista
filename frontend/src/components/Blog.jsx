import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogInfoVisible(!blogInfoVisible)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1
    })
  }

  const removeBlog = (event) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      event.preventDefault()
      deleteBlog({
        id: blog.id,
        title: blog.title
      })
    }
  }

  return (
    <div className='blogs'>

      <div className='blog' style={hideWhenVisible}>
        <div>{blog.title} {blog.author}</div>
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div className='blog' style={showWhenVisible}>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div><button className='removeButton' onClick={removeBlog}>remove</button></div>
        <button onClick={toggleVisibility}>hide</button>
      </div>

    </div>
  )
}

export default Blog