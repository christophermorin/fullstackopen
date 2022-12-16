import { 
  BrowserRouter as Router, 
  Routes, Link, Route 
} from 'react-router-dom'
import { useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  if(notification){
    setTimeout(() => {
      setNotification('')
    },3000)
  }
  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

    // setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <h1>Software Andecdotes</h1>
      {notification ? notification : ''}
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/about">About</Link>
        <Link style={padding} to="/create-new">Create New</Link>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes}/>} />
        <Route path="/about" element= {<About />} />
        <Route path="/create-new" element= {<CreateNew addNew={addNew} setNotification={setNotification}/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App