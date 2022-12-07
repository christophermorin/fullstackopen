import { useDispatch } from "react-redux"
import { createDote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addDote = (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    dispatch(createDote(content))
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