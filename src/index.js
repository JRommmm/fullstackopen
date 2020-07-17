import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
        {courses.map((course) => 

          <>
          <Course key={course.id} course={course} /> <p></p>
 
          </>

          
        )}

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))