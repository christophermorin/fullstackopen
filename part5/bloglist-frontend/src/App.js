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
  const [error, setError]  =useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('userName'))
    if(loggedUser){
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    const userIsAuth = JSON.parse(window.localStorage.getItem('user'))
    if(userIsAuth){
      blogService.getToken(userIsAuth)
    }
    else {
      console.log('Session expired')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    const userLogin = {
      username: username,
      password: password
    }
    try {
      const result = await loginService.getLogin(userLogin)
      window.localStorage.setItem('user', JSON.stringify(result.userAuth.user))
      window.localStorage.setItem('userName', JSON.stringify(result.name))

      blogService.setToken(result.userAuth.token)

      setPassword('')
      setUsername('')
      setUser(result.name)

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

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('userName')
    setUser('')
    setError(false)
    setMessage('You have been logged out')
    setTimeout(() => {
      setMessage(null)
    },3000)
  }

  const createBlog = async (newBlog) => {
    try {
      const result = await blogService.addBlog(newBlog)
      setBlogs(prevState => [...prevState, result])
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
          <h4>{user} is logged in</h4>{user && <Logout logout={handleLogout}/>}
          <Toggleable title={'Create New Entry'}>
            <AddBlog
              createBlog={createBlog}
            />
          </Toggleable>
          <ul id="allBlogs">
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                setBlogs={setBlogs}
                setMessage={setMessage}
                setError={setError}
              />
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App