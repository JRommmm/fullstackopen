import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'

const Filter = ({value, onChange}) => {

	return(
		<>
		<input value={value} onChange={onChange} />
		</>
		)
}

const PersonForm = ({addNameFunction, nameValue, nameChange, numberValue, numberChange}) => {


	return(
      <form onSubmit={addNameFunction}>
        <div>
          name: <input value={nameValue} onChange={nameChange}/>
        </div>
          <div>
          phone number: <input value={numberValue} onChange={numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

const PersonList = ({persons, newFilter, deleteNameF}) => {

	return(
        
	      <ul>
        {persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())).map((person, i) => 
          
          <>
          <Person 
            key={i} 
            person={person}  /> <button 
              onClick={() => deleteNameF(person.id)}> Delete </button> </>
        )}
      </ul>
      

	)
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')   

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')




const addName = (event) => {

  var nameE = false
  
  event.preventDefault()
  const nameObject = {
    name: newName,
    number: newNumber
  }

  const sameName = persons.map((person) => {
  	if (person.name === newName){
  		//console.log("ALERT: Name already exists")
  		nameE = true
  	}
  })
  //console.log(nameE)
  if (!nameE){
  	//setPersons(persons.concat(nameObject))

    personService
      .create(nameObject)
      .then(response => {
        //console.log(response.data)
        setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })

  	//setNewName('')
  	//setNewNumber('')
  	//console.log("Concatenaded")

  } 
  
}

const deleteName = id => {
  console.log("hi", id)
  axios
    //.get(`http://localhost:3001/persons/${id}`)
    .delete(`http://localhost:3001/persons/${id}`)
    .then(response => {
      axios
        .get(`http://localhost:3001/persons`)
        .then(response =>{
          setPersons(response.data)
        })
    })
}

const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

const handleFilter = (event) =>{
	setNewFilter(event.target.value)
	console.log(event.target.value)
}
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilter} />
      <p></p>
      <h3> Add New </h3> <p></p>
      <PersonForm addNameFunction={addName} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonList persons={persons} newFilter={newFilter} deleteNameF={(i) => 
        deleteName(i)} />
    </div>
  )

}

export default App