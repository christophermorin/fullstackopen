import { useState } from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ setBlogs, setMessage, setError }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const result = await blogService.addBlog(newBlog)
      setBlogs(prevState => [...prevState, result])

      setTitle('')
      setAuthor('')
      setUrl('')

      setError(false)
      setMessage('New blog added, not that\'ll we\'ll read it')
      setTimeout(() => {
        setMessage(null)
      },3000)
    } catch (error) {
      setError(true)
      setMessage('Could not add new blog. Did you include both a title and url?')
      setTimeout(() => {
        setMessage(null)
      },3000)
    }
  }

  const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '20px 0',
    gap: '10px'
  }

  return(
    <div>
      <form style={container} onSubmit={addBlog}>
        Title:<input
          name='Title'
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}/>
        Author:<input
          name='Author'
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}/>
        URL:<input
          name='URL'
          placeholder='URL'
          value={url}
          onChange={({ target }) => setUrl(target.value)}/>
        <button>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog