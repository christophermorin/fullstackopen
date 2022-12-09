import { useDispatch, useSelector } from 'react-redux'
import { upVoteOne } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ dotes, filtered }) => filtered
    ? dotes.filter(dote => dote.content.toLowerCase().includes(filtered))
    : dotes
  )

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(upVoteOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    }))
    dispatch(setNotificationMessage(`You voted for ${anecdote.content}`, 5))
  }

  const dotesDisplay = anecdotes.map(anecdote => {
    return(
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  })
  return (
    <div>
      {dotesDisplay}
    </div>
  )
}

export default AnecdoteList