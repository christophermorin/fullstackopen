import {useState} from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button style={{marginLeft: 10}}onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const allStats = good + neutral + bad
  const average = (good - bad / 3)  * .1
  const positive = (good / allStats) * 100

  return (
      <table>
        <tbody>
        <StatisticLine text='Good:' value={good}/>
        <StatisticLine text='Nuetral:' value={neutral}/>
        <StatisticLine text='Bad:' value={bad}/>
        <StatisticLine text='All Stats:' value={allStats}/>
        <StatisticLine text='Average:' value={average}/>
        <StatisticLine text='Positive:' value={positive}/>
        </tbody>
      </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good,neutral,bad)

  let displayStats = false
  if(good || neutral || bad){
    displayStats = true
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      {displayStats ? 
      <Statistics 
        good={good} 
        bad={bad}
        neutral={neutral}
      />
      :
      <p>No feedback given</p>
      }
    </div>
  );
}

export default App;