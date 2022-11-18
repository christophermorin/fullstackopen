import { useState } from "react";

const SelectBtn = (props) => {
  return (
    <div>
      <button onClick={props.clicked}>{props.text}</button>
    </div>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandomNumber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    let copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  const highestVote = points.indexOf(Math.max(...points))
  const winner = anecdotes[highestVote]
  console.log(points)
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <SelectBtn text='Next Anecdote' clicked={getRandomNumber}/>
      <SelectBtn text='Vote' clicked={handleVote}/>
      <h2>Anecdote with the most votes</h2>
      {highestVote > 0 ? winner : 'Please Vote'}
    </div>
  );
}

export default App;