import { Link } from "react-router-dom"

const AnecdoteList = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {props.anecdotes.map(anecdote => 
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList