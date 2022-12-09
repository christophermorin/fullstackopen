import { useDispatch, useSelector } from "react-redux"
import { upVoteOne } from "../reducers/anecdoteReducer"
import { setNotificationMessage} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.dotes)
  const filtered = useSelector(state => state.filtered)

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(upVoteOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    }))
    dispatch(setNotificationMessage(`You voted for ${anecdote.content}`, 5)) 
  }

  const dotesDisplay = filtered 
    ? 
      <div>
        {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filtered)).map(anecdote => 
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

  return (
    <div>
      {dotesDisplay}
    </div>
)
}

export default AnecdoteList