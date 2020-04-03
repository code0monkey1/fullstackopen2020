import React, { useState ,useEffect} from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'
import personService from '../service/person'
import Notification from './Notification'
import './App.css'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [filterByName,setFilterByName]=useState(false);
  const [matchingNames,setMatchingNames]=useState([]);
  const [notification,setNotification]=useState(null)
  const [entryValid,setEntryValid]=useState(true)
  
  useEffect(() => {
      personService.getAll()
      .then(personData=> setPersons(personData))
   }, [])
  
  const onTypingNumber=(event)=>{
      setNewNumber(event.target.value)
  }

  const onTypingName=(event)=>{
   setNewName (event.target.value)
  }

  const deletePerson=(person)=>{
   //delete from server
     personService.del(person.id)
     .catch(error => {
      setEntryValid(false)
      setNotification( `the person '${person.name}' was already deleted from server`)
      
      setTimeout(() => {
        setNotification(null)
       }, 5000)

     setPersons(persons.filter(per => per.name !== person.name))
     setNewName("")
     setNewNumber("")
   })
   // delete from persons hook
     setPersons(persons.filter(per=>per.id!==person.id))
  }
  
  const addPerson=(event)=>{
   
    event.preventDefault()
    setFilterByName(false)
    

   const isSamePerson=persons
   .some( person=> person.name===newName)
    
  //if person with same name entred
  //then propt the user
    if(isSamePerson){
      const personToFind=persons.find( person => 
                                        person.name===newName)
      if (window.confirm(`${newName} 
         is already added to phonebook ,
         do you want to add the new number ? `)){
           const newObj={
             ...personToFind,number:newNumber
           }
            personService.update(personToFind.id,newObj)
            .then(returnedPerson =>
                  setPersons( persons
                  .map( person=> 
                          person.name===newName?newObj:person)
                          )
              
              ).catch(error => {
                 setEntryValid(false)
                 setNotification( `the person '${personToFind.name}' was already deleted from server`)
                 
                setPersons(persons.filter(person => person.name !== personToFind.name))
                setNewName("")
                setNewNumber("")
              })
              
              setEntryValid(true)
              setNotification(
                `Note '${newName}' with number ${newNumber} has been added`)
              setTimeout(() => {
               setNotification(null)
              }, 5000) 
              setNewNumber("")
              setNewName("")
         } 
     setNewName("")
     setNewNumber("")
     return;

    }
    //else follow the happy path
    const newObject={
      name: newName,
      number: newNumber
      }
     // add to jSon server 
    personService.create(newObject)
    .then ( returnedPerson =>
     //addded to persons hook
     setPersons( persons.concat( returnedPerson ) )
    )

    setNotification(
      `Note '${newName}' with number ${newNumber} has been added`)
    setTimeout(() => {
     setNotification(null)
    }, 5000) 
    setNewNumber("")
    setNewName("")
  }
  const searchNDisplay=(event)=>{
      setFilterByName(true)
      const searchWord= event.target.value;
      console.log(searchWord)
        
      setMatchingNames(
                    persons.filter( person=> 
                       
                        person.name.toLowerCase()
                        .includes(searchWord.toLowerCase())
                                
                        )
            )

    console.log(matchingNames)
    
  }
  console.log('search for matching names',filterByName)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
      notification={notification}
      entryValid={entryValid}
      />
     <Filter action={searchNDisplay}/>
     <h3>add a new </h3> 
     <PersonForm 
                addName={addPerson}
                newName={newName}
                newNumber={newNumber}
                onTypingName={onTypingName}
                onTypingNumber={onTypingNumber}
                />
      <h2>Numbers</h2>
      
      {filterByName?
      matchingNames.map(matchingNames=> <Person 
                        key={matchingNames.name}
                        person={matchingNames}/>
                )
      : 
      persons.map(person=> <Person 
                            key={person.name}
                            person={person}
                            deletePerson={deletePerson}
                            />
          )}
    </div>
  )
}

export default App