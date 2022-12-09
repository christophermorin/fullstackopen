// import { useDispatch } from "react-redux"
import { setNotificationMessage} from "../reducers/notificationReducer"
import { addNewDote } from "../reducers/anecdoteReducer"
import { connect } from "react-redux"

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  const addDote = (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    const newDote = {
      content: content,
      votes: 0
    }
    event.target.dote.value = ''
    props.addNewDote(newDote)
    props.setNotificationMessage(`${newDote.content} added`, 5)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addDote}>
        <div><input name="dote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

// const mapDispatchToProps = {
//   addNewDote,
//   setNotificationMessage
// }


const ConnectedAnecdoteForm = connect(
  null,
  // Alternative way of using mapDispatchToProps
  {
    addNewDote,
    setNotificationMessage
  }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
// export default AnecdoteForm