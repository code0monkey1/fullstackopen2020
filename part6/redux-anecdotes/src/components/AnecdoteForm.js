import React from 'react'
// useDispatch hook used to trigger the Actions
import {useDispatch} from 'react-redux'
// Action Creator function ,used to add the content of the anecdote to the list 
import {addAnecdote} from '../reducers/anecdoteReducer'
// Action Creator function ,used to set the notification as the 'content' of the newly added anecdote
import {setNotification} from '../reducers/notificationReducer.js'


// used to capture the content of the new anecdote
const  AnecdoteForm =()=>{
        
       const dispatch = useDispatch()

        const addNewAnecdote =async(event)=>{
        event.preventDefault()
        // this gets the value of the input named 'anecdote'
        const content =event.target.anecdote.value
        console.log("The anecdote is : ",content)
        // blank out the input 
        event.target.anecdote.value=''
        
        // both async anecdote addition 
        // and updating to redux store handled in redux-thunk
        dispatch(addAnecdote(content))
        // next dispatch the action to set the content of the note as notification
        dispatch(setNotification(content,10))

        }
        return (
            <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div>    Anecdote : <input name="anecdote" /></div>
                <button type='submit' >create</button>
            </form>
            </div>
        )
    }

export default AnecdoteForm

