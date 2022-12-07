import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogExpanded from './BlogExpanded'
import AddBlog from './AddBlog'

test('renders both author and title, but not url or likes', () => {
  const blog = {
    title: 'root title',
    author: 'root author',
    url: 'root.url',
    likes: 12
  }

  render(<Blog blog={blog} />)
  screen.debug()

  screen.getByText('root title')
  screen.getByText('root author')
  screen.queryByText('root.url')
  screen.queryByText('12')

})

test('expand event handler shows url and likes', async () => {
  const blog = {
    title: 'root title',
    author: 'root author',
    url: 'root.url',
    likes: 12,
  }
  render(<Blog blog={blog}  />)

  const user = userEvent.setup()
  const button = screen.getByText('Expand')
  await user.click(button)
  const url = screen.getByText('root.url')
  const likes = screen.getByText(12)

  expect(url).toBeDefined
  expect(likes).toBeDefined
})

test('like button handler is clicked twice', async () => {
  const blog = {
    title: 'root title',
    author: 'root author',
    url: 'root.url',
    likes: 12,
  }

  const mockHandler = jest.fn()

  render(<BlogExpanded blog={blog} incrementLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  for(let i = 0; i < 2; i++){
    await user.click(button)
  }

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Add blog form is called with correct value', async () => {
  const blog = {
    title: 'root title',
    author: 'root author',
    url: 'root.url',
  }
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<AddBlog createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('URL')
  const addBlog = screen.getByText('Add Blog')
  screen.debug(addBlog)

  await user.type(title, 'root title')
  await user.type(author, 'root author')
  await user.type(url, 'root.url')
  await user.click(addBlog)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(blog)
})