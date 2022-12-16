import Notification from './Notification'
import PropTypes from 'prop-types'
const Form = (props) => {
  return (
    <div>
      <h2>Login</h2>
      {props.message && (
        <Notification message={props.message} error={props.error} />
      )}
      <form onSubmit={props.handleLogin}>
        <input
          name="username"
          placeholder="Username"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
          id="username"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
          id="password"
        />
        <button id="submit">Submit</button>
      </form>
    </div>
  )
}

Form.propTypes = {
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default Form
