import Notification from "./Notification"

const Form = (props) => {
  return(
    <div>
      <h2>Login</h2>
        {props.message && <Notification message={props.message} error={props.error}/>}
        <form onSubmit={props.handleLogin}>
          <input 
            name='Username' 
            placeholder='Username' 
            value={props.username}
            onChange={({target}) => props.setUsername(target.value)}
            />
          <input 
            name='Password' 
            placeholder='Password' 
            type='password'
            value={props.password} 
            onChange={({target}) => props.setPassword(target.value)}
          />
          <button>Submit</button>
        </form>
    </div>
  )
}

export default Form