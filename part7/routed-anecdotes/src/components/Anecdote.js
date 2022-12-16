import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
const Anecdote = (props) => {
  const id = Number(useParams().id)
  const anecdote = props.anecdotes.find((anecdote) => anecdote.id === id)
  console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.author}</h2>
      <ul>
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
      </ul>
    </div>
  )
}

export default Anecdote