// import { useState } from 'react'
// import BlogExpanded from './BlogExpanded'
// import blogServices from '../services/blogs'
// import { useDispatch } from 'react-redux'
// import { setNotificationMessage } from '../reducers/notificationReducer'
// import { setErrorStyle } from '../reducers/errorReducer'

// import { likeOneBlog, deleteOneBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  // const [expandBlog, setExpandBlog] = useState(false)
  // const dispatch = useDispatch()

  // const toggleExpand = () => {
  //   setExpandBlog((prevState) => !prevState)
  // }

  // const incrementLike = async () => {
  //   const newBlog = { ...blog }
  //   newBlog.likes+=1
  //   dispatch(likeOneBlog(newBlog.id, newBlog))
  //   try {
  //     await blogServices.incrementLike(blog.id, newBlog)
  //   } catch (error) {
  //     console.log('Could not add blog')
  //   }
  // }

  // const deleteBlog = async () => {
  //   try {
  //     await blogServices.deleteBlog(blog.id)
  //     dispatch(deleteOneBlog(blog.id))
  //     dispatch(setErrorStyle(false))
  //     dispatch(setNotificationMessage('Didn\'t want to read that blog anyways..', 5))
  //   } catch (error) {
  //     dispatch(setErrorStyle(true))
  //     dispatch(setNotificationMessage('Can\'t delete this blog, is it yours?', 5))
  //   }
  // }

  const styles = {
    border: '2px solid black',
    padding: '10px',
  }

  return (
    <li style={styles} className="blog">
      <span>{blog.title}</span>-<span>{blog.author}</span>
      {/* <button onClick={toggleExpand} style={{ marginLeft: '10px' }}>
        Expand
      </button> */}
      {/* {expandBlog && (
        <BlogExpanded
          blog={blog}
          incrementLike={incrementLike}
          deleteBlog={deleteBlog}
        />
      )} */}
    </li>
  )
}

export default Blog
