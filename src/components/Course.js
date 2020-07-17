import React from 'react'
import Info from'./Info'

const Course = ({ course }) => {
  return (
  		<>
       <h1> {course.name} </h1> <p></p>



        {course.parts.map((x) =>
        	<Info key={x.id} x={x} />
        
        )}

        Total excercises: {course.parts.reduce( (sum, part) => {
        	return sum + part.exercises
        }, 0)}	

      </>
  )

}

export default Course


      /*
      <li>
        {course.map((note, i) => 
          <Note key={note.id} note={note} />
        )}
      </li>
      */