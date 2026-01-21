const CreateBlogForm = ({
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl,
  addBlog
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={newAuthor}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={newUrl}
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm