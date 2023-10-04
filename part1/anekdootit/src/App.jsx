import { useState } from 'react'

const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() 
            * (max - min + 1)) + min;
}
const votes = [0,0,0,0,0,0,0,0]

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(randomNumberInRange(0,7))
  const [voteCounter, setVoteCounter] = useState(votes[selected])

  const handleNextClick = () => {
    const nextSelected = randomNumberInRange(0,7)
    setSelected(nextSelected)
    setVoteCounter(votes[nextSelected])
  }

  const handleVoteClick = () => {
    const updatedCtr = voteCounter + 1
    setVoteCounter(updatedCtr)
    votes[selected] = updatedCtr
  }

  const Mostvotes = () => {
    const votesCopy = [...votes]
    votesCopy.sort(function (a,b){return b-a})
      let index = votes.findIndex(vote => vote === votesCopy[0])
    console.log('index:', index)
    return (
      <div>
        <h2> Anecdote with most votes</h2>
        {anecdotes[index]}
      </div>
     )
    }

  return (
    <div>
      <h2> Anecdote of the day </h2>
      {anecdotes[selected]}
      <br/>
      has {voteCounter} votes
      <br/>
      <br/>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>Next anecdote</button>
      <Mostvotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App