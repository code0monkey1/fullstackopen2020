import React from 'react'

// used to get information of all the stores (filter,anecdotes,notification) and dispatch Action Creator functions 
import { useSelector, useDispatch } from 'react-redux'
// Action Creator imported from anecdoteReducer to trigger increase in vote of anecdote
import {increaseVotes} from  '../reducers/anecdoteReducer'
// Action Creator function ,used to set the notification as the 'content' whenever up-voted
import {setNotification} from '../reducers/notificationReducer'

export default function AnecdoteList() {
  
  const anecdotes = useSelector( ({anecdotes,filter}) =>  anecdotes.filter( anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
 
 // used to dispatch the actions from notificationReducer and anecdoteReducer when anecdotes 
 // vote is increased
  const dispatch = useDispatch()

  // the used dispatch hook is used to call the dispatch function increaseVotes()
  const vote = async(id) => {
    console.log('vote', id)

    const anecdoteToChange = anecdotes.find( anecdote => anecdote.id===id)
    const modifiedAnecdote = {...anecdoteToChange,votes:anecdoteToChange.votes+1}
     
    console.log("The modified anecdote is ",modifiedAnecdote)
 // call the async redux-thunk call
    dispatch(increaseVotes(id,modifiedAnecdote))

  // show notification whenever an annotation is voted for
    dispatch(setNotification(modifiedAnecdote.content,10))
 
  }

    return (
        <div>
  
            {anecdotes.map(anecdote =>
                            <div key={anecdote.id}>
                                <div>
                                  {anecdote.content}
                                </div>
                                <div>
                                  has {anecdote.votes}
                                  <button onClick={() => vote(anecdote.id)}>vote</button>
                                </div>                       
                             </div>
                  )}
                    </div>
                )
}
