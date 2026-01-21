import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const blog = {
  title: 'Test blog',
  author: 'Test Author',
  likes: 2,
  url: 'https://testurl.com',
  user: {
    name: 'Test Name',
    username: 'testUsername'
  }
}

test('renders title', () => {
  render(<Blog blog={blog} />)
  const element = screen.findByText('Test blog')
})

test('renders author', () => {
  render(<Blog blog={blog} />)
  const element = screen.findByText('Test Author')
})

test('does not render likes', () => {
  render(<Blog blog={blog} />)
  expect(screen.getByText('likes: 2'), { exact: false }).not.toBeVisible()
})

test('does not render url', () => {
  render(<Blog blog={blog} />)
  expect(screen.getByText('https://testurl.com'), { exact: false }).not.toBeVisible()
})

test('does not render url', () => {
  render(<Blog blog={blog} />)
  expect(screen.getByText('https://testurl.com'), { exact: false }).not.toBeVisible()
})

test('render url after clicking view', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('https://testurl.com')
  expect(element).toBeVisible()
})

test('render likes after clicking view', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('likes: 2')
  expect(element).toBeVisible()
})

test('render name after clicking view', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('Test Name')
  expect(element).toBeVisible()
})

test('call handler twice after clicking like twice', async () => {
  const mockUpdateBlog = vi.fn()
  render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})