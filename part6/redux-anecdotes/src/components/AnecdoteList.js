import { useDispatch, useSelector } from "react-redux"
import { upVoteOne } from "../reducers/anecdoteReducer"
import { setNotificationMessage} from "../reducers/notificationReducer"
import { filterUpVoteOne } from "../reducers/filterReducer"



const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.dotes)
  const filtered = useSelector(state => state.filtered)

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    if(filtered){
      dispatch(filterUpVoteOne(anecdote.id, {
        ...anecdote,
        votes: anecdote.votes + 1
      }))
    }
    dispatch(upVoteOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    }))
    dispatch(setNotificationMessage(`You voted for ${anecdote.content}`, 5)) 
  }

  return (
    filtered.length === 0 ?
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    :
    <div>
    {filtered.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default AnecdoteList