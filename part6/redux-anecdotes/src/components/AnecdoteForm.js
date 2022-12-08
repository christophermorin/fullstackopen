import { useDispatch } from "react-redux"
import { setNotificationMessage} from "../reducers/notificationReducer"
import { addNewDote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addDote = (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    const newDote = {
      content: content,
      votes: 0
    }
    event.target.dote.value = ''
    dispatch(addNewDote(newDote))
    dispatch(setNotificationMessage(`${newDote.content} added`, 5))
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

export default AnecdoteForm