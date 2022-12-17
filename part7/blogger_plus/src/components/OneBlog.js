import { useDispatch } from 'react-redux'
import {  useEffect, useState } from 'react'
import { likeOneBlog, deleteOneBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import blogServices from '../services/blogs'
import { setErrorStyle } from '../reducers/errorReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'
import { Button, ListItemText, TextField } from '@mui/material'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material'

const OneBlog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [blog, setBlog] = useState([])
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const navigate = useNavigate()

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

  const deleteBlog = async () => {
    try {
      await blogServices.deleteBlog(blog.id)
      dispatch(deleteOneBlog(blog.id))
      dispatch(setErrorStyle(false))
      dispatch(setNotificationMessage('Didn\'t want to read that blog anyways..', 5))
      setBlog(null)
      navigate('/')
    } catch (error) {
      dispatch(setErrorStyle(true))
      dispatch(setNotificationMessage('Can\'t delete this blog, is it yours?', 5))
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
    setComment('')
    await blogServices.addComment(blog.id, { comment } )
  }

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px'
  }

  const displayComments  =  comments.length > 0
    ? comments.map(comment => {
      return(
        <ListItem key={comment.id}>
          <ListItemButton>
            <ListItemText>
              {comment.content}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )
    })
    :
    null

  return (
    <div>
      <h2>
        Viewing: <span style={{ color: 'green' }}>
          {blog.title}. Added by {blog.author}
        </span>
      </h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell align="right">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <a
                  href="#"
                  rel='norefferer'
                  target={'_blank'}
                >
                  {blog.url}
                </a>
              </TableCell>
              <TableCell align="right">{blog.likes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: '30px 0' }}>
        <Button
          style={{ margin: '0 15px' }}
          onClick={incrementLike}
          variant="contained"
          color="success"
        >
            Like
        </Button>
        <Button
          style={{ margin: '0 15px' }}
          onClick={deleteBlog}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </div>
      <form style={formStyles}>
        <TextField
          type="text"
          onChange={handleChange}
          value={comment}
          placeholder="Comment"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
        >
          Add Comment
        </Button>
      </form>
      <List>
        {displayComments}
      </List>
    </div>
  )
}

export default OneBlog