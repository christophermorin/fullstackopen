import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/hooks'
const CreateNew = (props) => {

  const content = useForm('text')
  const author = useForm('text')
  const info = useForm('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`${content.value} added to anecdotes`)
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...{...content, reset:null} } />
        </div>
        <div>
          author
          <input {...{...author, reset:null}} />
        </div>
        <div>
          url for more info
          <input {...{...info, reset:null}} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew