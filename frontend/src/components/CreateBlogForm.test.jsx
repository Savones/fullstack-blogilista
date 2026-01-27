import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
import { vi } from 'vitest'

test('when creating new blog calls function with correct info', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(
    <CreateBlogForm createBlog={createBlog} />
  )

  const button = screen.getByText('create')
  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')

  await user.type(title, 'Test blog title')
  await user.type(author, 'Test author')
  await user.type(url, 'https://testurl.com')
  await user.click(button)

  expect(createBlog.mock.calls[0][0].title).toBe('Test blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('https://testurl.com')
})

