import { useDispatch } from 'react-redux'
import {  useEffect, useState } from 'react'
import { likeOneBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import blogServices from '../services/blogs'

const OneBlog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [blog, setBlog] = useState([])
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getBlogs = async (id) => {
      const allBlogs = await blogServices.getAll()
      const blog = await allBlogs.find(blog => blog.id === id)
      setComments(blog.comments)
      setBlog(blog)
    }
    getBlogs(id)
  }, [id])

  if(!blog){
    return null
  }

  const incrementLike = async () => {
    const newBlog = { ...blog }
    blog.likes+=1
    newBlog.likes+=1
    dispatch(likeOneBlog(newBlog.id, newBlog))
    try {
      await blogServices.incrementLike(blog.id, newBlog)
    } catch (error) {
      console.log('Could not add blog')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setComment(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('what')
    setComments(prevState => [...prevState, {
      id: Math.floor(Math.random()* 50000),
      content: comment
    }])
    await blogServices.addComment(blog.id, { comment } )
  }

  return (
    <div>
      <ul>
        <li>
          <span id="authorExpanded">{blog.author}</span>
        </li>
        <li>
          <span id="urlExpanded">{blog.url}</span>
        </li>
        <li>
          <span id="likesExpanded">{blog.likes}</span>
          <button style={{ marginLeft: '10px' }} onClick={incrementLike}>
            Like
          </button>
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={comment}/>
        <button>Add Comment</button>
      </form>
      {
        comments.length > 0
          ? comments.map(comment => {
            return(
              <div key={comment.id}>
                {comment.content}
              </div>
            )
          })
          :
          null
      }
    </div>
  )
}

export default OneBlog