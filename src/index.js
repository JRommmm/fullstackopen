import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = (props) => {
  const [selected, setSelected] = useState(0)


  return (
    <div>
      <h1> Anecdotes </h1> <p></p>
      {props.anecdotes[selected]}<p></p>
      This has {votes[selected]} votes <p></p>
      <button onClick={() => votes[selected] += 1}>Vote</button>
      <button onClick={() => setSelected(getRandomInt(ADlength))}>Next Anecdote</button>
      <h1> Best Anecdote </h1> <p></p>
      
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

var ADlength = anecdotes.length;

var votes = new Array(ADlength).fill(0);




ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)