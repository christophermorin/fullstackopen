import { useState } from 'react'
import BlogExpanded from './BlogExpanded'
import blogServices from '../services/blogs'

const Blog = ({ blog, setBlogs, setMessage, setError }) => {
  const [expandBlog, setExpandBlog] = useState(false)

  const toggleExpand = () => {
    setExpandBlog(prevState => !prevState)
  }

  const incrementLike = async () => {
    const newBlog = {
      title:  blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes += 1,
      user: blog.user.id
    }
    try {
      await blogServices.incrementLike(blog.id, newBlog)
      setBlogs(prevState => [...prevState])
    } catch (error) {
      console.log('No likey')
    }
  }

  const deleteBlog = async () => {
    try {
      await blogServices.deleteBlog(blog.id)
      setBlogs(prevState => prevState.filter(prevBlog => prevBlog.id !== blog.id))
      setError(false)
      setMessage(`Didn't want to read ${blog.title} anyways`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setError(true)
      setMessage('Cannot delete this blog, is it yours?')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const styles = {
    border: '2px solid black',
    padding: '10px'
  }

  return(
    <li style={styles}>
      {blog.title}<button onClick={toggleExpand}  style={{ marginLeft: '10px' }}>Expand</button>
      {expandBlog &&
        <BlogExpanded
          blog={blog}
          incrementLike={incrementLike}
          deleteBlog={deleteBlog}
        />}
    </li>
  )
}

export default Blog