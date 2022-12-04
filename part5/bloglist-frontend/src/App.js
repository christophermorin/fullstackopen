import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'
import Logout from './components/Logout'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError]  =useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'))
    if(loggedUser){
      setUser(loggedUser)
    }
  }, [])

  

  const handleLogin = async (event) => {
    event.preventDefault()
    const userLogin = {
      username: username,
      password: password
    }
    try {
      const result = await loginService.getLogin(userLogin)
      window.localStorage.setItem('user', JSON.stringify(result))

      blogService.setToken(result.token)

      setPassword('')
      setUsername('')
      setUser(result)

      setError(false)
      setMessage(`${result.name} logged in`)
      setTimeout(() => {
        setMessage(null)
      },3000)
      
    } catch (error) {
      setError(true)
      setMessage('Invalid username or password')
      setTimeout(() => {
        setMessage(null)
      },3000)
     
    }    
  }

  const handleLogout = () =>{
    window.localStorage.removeItem('user')
    setUser('')
    setError(false)
    setMessage('Later aligator')
    setTimeout(() => {
      setMessage(null)
    },3000)
  }

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
      setMessage(`New blog added, not that'll we'll read it`)
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

  return (
    <div>
      {!user 
      ?
        <div>
          <Form 
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            message={message}
            error={error}
          />
        </div>
      :
      <div>
        <h2>blogs</h2>
        {message && <Notification message={message} error={error}/>}
        <h4>{user.name} is logged in</h4>{user && <Logout logout={handleLogout}/>}
        <Toggleable>
          <AddBlog 
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            addBlog={addBlog}
          />
        </Toggleable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App
