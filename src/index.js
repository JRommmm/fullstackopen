import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
    <h1>
      <p>{props.text}</p>
    </h1>
    </>
    
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.text} {props.amount}</p>
    </>
  )
}

const Content = (props) =>{
	return(
	<>
	  <Part text={props.text1} amount={props.amount1} />   
      <Part text={props.text2} amount={props.amount2} />       
      <Part text={props.text3} amount={props.amount3} /> 
    </>
	)
}

const Total = (props) => {
  return (
    <>
      Number of exercises {props.amount}
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header text={course} />   
      <Content text1={parts[0].name} amount1={parts[0].exercises} text2={parts[1].name} amount2={parts[1].exercises} text3={parts[2].name} amount3={parts[2].exercises}/>   
      <Total amount={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))