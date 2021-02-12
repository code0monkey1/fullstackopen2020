import React,{useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList.js'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'

import {useDispatch} from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
const App = () => {
// app will only consist of other components what make up the app
   
   const dispatch= useDispatch()
  useEffect(() => {
         // populate the anecdotes through dispatching and ACTION 
         // and feeding the data got from api call into the store        
         dispatch(initializeAnecdotes()) 
           
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
        <Notification/>
        <Filter />
        <AnecdoteList/> 
        <AnecdoteForm/>
    </div>
  )
}

export default App