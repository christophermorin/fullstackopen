import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import AllUsers from './components/AllUsers'
import OneUser from './components/OneUser'
import OneBlog from './components/OneBlog'
import BlogList from './components/BlogList'
import NavBar from './components/NavBar'

import { useDispatch, useSelector } from 'react-redux'
import { setNotificationMessage } from './reducers/notificationReducer'
import { setErrorStyle } from './reducers/errorReducer'
import { addNewBlog, setBlogs } from './reducers/blogReducer'

import { Container } from '@mui/material'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const allBlogs = useSelector(({ blogs }) => blogs.map(b => b))

  useEffect(() => {
    const getBlogs = async () => {
      const result = await blogService.getAll()
      dispatch(setBlogs(result))
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('userName'))
    if (loggedUser) {
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    const userIsAuth = JSON.parse(window.localStorage.getItem('user'))
    if (userIsAuth) {
      blogService.getToken(userIsAuth)
    } else {
      console.log('Session expired')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    const userLogin = {
      username: username,
      password: password,
    }
    try {
      const result = await loginService.getLogin(userLogin)
      window.localStorage.setItem('user', JSON.stringify(result.userAuth.user))
      window.localStorage.setItem('userName', JSON.stringify(result.name))
      blogService.setToken(result.userAuth.token)

      setPassword('')
      setUsername('')
      setUser(result.name)
      dispatch(setErrorStyle(false))
      dispatch(setNotificationMessage('User logged in', 5))
    } catch (error) {
      dispatch(setErrorStyle(true))
      dispatch(setNotificationMessage('Invalid username or password', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('userName')
    setUser('')
    dispatch(setErrorStyle(false))
    dispatch(setNotificationMessage('User logged out', 5))
  }

  const createBlog = async (newBlog) => {
    try {
      const result = await blogService.addBlog(newBlog)
      dispatch(addNewBlog(result))
      dispatch(setErrorStyle(false))
      dispatch(setNotificationMessage('New blog added, not that we\'ll read it...', 5))
    } catch (error) {
      dispatch(setErrorStyle(true))
      dispatch(setNotificationMessage('Could not add blog, did you include both a title and url?', 5))
    }
  }
  return (
    <Container style={{ paddingTop: '50px' }}>
      <Router position='static'>
        {notifications.length > 0
          ? <Notification />
          : null
        }
        {!user ? (
          <div>
            <Form
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </div>
        ) : (
          <div>
            <NavBar logOut={handleLogout}/>
            <h3><span style={{ color: 'green', fontSize: '1.5rem' }}>{user}</span> is logged in</h3>
            <Toggleable title={'Create New Entry'}>
              <AddBlog createBlog={createBlog} />
            </Toggleable>
            <Routes>
              <Route path="/" element={<BlogList allBlogs={allBlogs} />} />
              <Route path="/blogs/:id" element={<OneBlog allBlogs={allBlogs}/>} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/users/:id" element={ <OneUser />} />
            </Routes>
          </div>
        )}
      </Router>
    </Container>
  )
}

export default App