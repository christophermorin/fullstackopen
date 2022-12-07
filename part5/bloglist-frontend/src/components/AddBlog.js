import { useState } from 'react'

const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
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
          onChange={({ target }) => setTitle(target.value)}
          id='title'
        />
        Author:<input
          name='Author'
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id='author'
        />
        URL:<input
          name='URL'
          placeholder='URL'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id='url'
        />
        <button id='submit'>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog