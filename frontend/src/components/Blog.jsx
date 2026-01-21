import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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
        <button onClick={toggleVisibility}>hide</button>
      </div>

    </div>
  )
}

export default Blog