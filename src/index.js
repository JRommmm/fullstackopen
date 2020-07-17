import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = ({text, value}) => <><td> {text} </td><td> {value} </td></>

const Statistics = ({good, bad, neutral, total}) => {
      const average = (good - bad) / total;
      const positive = good / total;
      if (total === 0){
      	return(
      		<>
      		No feedback given	
      		</>
      		)
      }
	  return(
		  
  	  <>
	  <h2> Statistics </h2>
      <table>
      <tbody>
      <tr><StatisticLine text="Good" value={good} /></tr>
      <tr><StatisticLine text="Neutral" value={neutral} /></tr>
      <tr><StatisticLine text="Bad" value={bad} /></tr>
      <tr><StatisticLine text="All" value={total} /></tr>
      <tr><StatisticLine text="Average" value={average} /></tr>
      <tr><StatisticLine text="Positive" value={positive} /></tr>
      </tbody>
      </table>
      </>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
 
  const updateGood = () => {
		setGood(good + 1);
		setTotal(total + 1);
	}

  const updateNeutral = () => {
		setNeutral(neutral + 1);
		setTotal(total + 1);
	}	

  const updateBad = () => {
		setBad(bad + 1);
		setTotal(total + 1);
	}


  return (
    <div>
      <h1> Give Feedback </h1>
      <p></p>
      <button onClick={() => updateGood()}>
      Good
      </button>
      <button onClick={() => updateNeutral()}>
      Neutral
      </button> 
      <button onClick={() => updateBad()}>
      Bad
      </button>
      <p></p>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}  />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)