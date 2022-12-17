import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUp from './SignUp'

import { Button } from '@mui/material'

const Form = ({ username, password, setUsername, setPassword, handleLogin }) => {

  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleSignUp, setToggleSignUp]= useState(false)

  const handleVisibility = (e) => {
    const name = e.target.name
    if(name === 'login'){
      setToggleLogin(true)
      setToggleSignUp(false)
    }
    else if(name === 'signup'){
      setToggleSignUp(true)
      setToggleLogin(false)
    }
    else if(name === 'user_created'){
      setToggleLogin(true)
      setToggleSignUp(false)
    }
  }

  const buttonStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '50px'
  }

  return (
    <div>
      {toggleLogin &&
        <LoginForm
          username={ username }
          password={ password }
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleLogin={ handleLogin }
        />
      }
      {toggleSignUp &&
        <SignUp setToggleSignUp={setToggleSignUp} setToggleLogin={setToggleLogin}/>
      }
      <div style={buttonStyles}>
        <Button name='login' onClick={handleVisibility} variant='contained'>Go to Login</Button>
        <Button name='signup' onClick={handleVisibility} variant='contained'>Go to SignUp</Button>
      </div>
    </div>
  )
}

export default Form
