import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title', () => {
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

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.findByText('Test blog')
})

test('renders author', () => {
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

  render(<Blog blog={blog} />)

  const element = screen.findByText('Test Author')
})

test('does not render likes', () => {
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

  render(<Blog blog={blog} />)

  expect(screen.getByText('likes: 2'), { exact: false }).not.toBeVisible()
})

test('does not render url', () => {
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

  render(<Blog blog={blog} />)

  expect(screen.getByText('https://testurl.com'), { exact: false }).not.toBeVisible()
})