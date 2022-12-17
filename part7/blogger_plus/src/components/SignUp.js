import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import userServices from '../services/users'
import { setNotificationMessage } from '../reducers/notificationReducer'
import { setErrorStyle } from '../reducers/errorReducer'
import { useDispatch } from 'react-redux'


const SignUp = (props) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const createUser = () => {
    if(password & confirmPassword & password === confirmPassword){
      const newUser = {
        name: name,
        username: username,
        password: password
      }
      userServices.createNewUser(newUser)
      dispatch(setErrorStyle(false))
      dispatch(setNotificationMessage('User Created, please log in', 5))
      setName('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      props.setToggleSignUp(false)
      props.setToggleLogin(true)
    }
    else{
      dispatch(setErrorStyle(true))
      dispatch(setNotificationMessage('Could not create user', 5))
    }
  }

  const headers = {
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: '10px'
  }
  const formDisplay = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
    gap: '20px',
  }
  console.log(password)
  return (
    <div>
      <h2 style={headers}>SignUp</h2>
      <form style={formDisplay}>
        <TextField type='text'value={name}placeholder='Name' onChange={({ target }) => setName(target.value)}/>
        <TextField type='text'value={username}placeholder='Username' onChange={({ target }) => setUsername(target.value)}/>
        <TextField type='password'value={password}placeholder='Password' onChange={({ target }) => setPassword(target.value)}/>
        <TextField type='password'value={confirmPassword}placeholder='Confirm Password' onChange={({ target }) => setConfirmPassword(target.value)}/>
        <Button variant='contained' color='success' onClick={createUser}>Create User</Button>
      </form>
    </div>
  )
}



export default SignUp
