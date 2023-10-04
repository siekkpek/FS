import { useState } from 'react'

const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <div>
        <br/>
        <br/>
        <h4>No feedback given</h4>
      </div>
    )
  }
  let positive = (props.good*100) /props.total
  let average = (props.good-props.bad) / props.total
  return (
      <div>
        <h3>statistics</h3>
          <table>
            <tbody>
              <StatisticLine text='good' value={props.good}/>
              <StatisticLine text='neutral' value={props.neutral}/>
              <StatisticLine text='bad' value={props.bad}/>
              <StatisticLine text='all' value={props.total}/>
              <StatisticLine text='average' value={average}/>
              <StatisticLine text='positive' value={positive}/>
            </tbody>
          </table>
      </div>
  )
}

const Button = (props) => (
    <button onClick={props.handler}>
      {props.text}
    </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text}</td>
      <td> {props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    let updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }
  const handleNeutralClick = () => {
    let updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }
  const handleBadClick = () => {
    let updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
  }
  return ( 
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handler={handleGoodClick} text='Good'/>
        <Button handler={handleNeutralClick} text='Neutral'/>
        <Button handler={handleBadClick} text='Bad'/>
        <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      </div>
    </div>
  )
}

export default App