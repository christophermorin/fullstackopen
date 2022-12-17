import Notification from './Notification'
import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'

const LoginForm = (props) => {

  return (
    <div>
      <div>
        <h2 style={headers}>Login</h2>
        {props.message && (
          <Notification message={props.message} error={props.error} />
        )}
        <form style={formDisplay}>
          <TextField
            name="username"
            placeholder="Username"
            value={props.username}
            onChange={({ target }) => props.setUsername(target.value)}
            id="username"
          />
          <TextField
            name="password"
            placeholder="Password"
            type="password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
            id="password"
          />
          <Button id="submit" onClick={props.handleLogin} variant="contained" color="success">Submit</Button>
        </form>
      </div>
    </div>
  )
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

LoginForm.propTypes = {
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
