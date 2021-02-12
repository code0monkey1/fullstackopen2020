// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
// getting random id's form each anecdote object
// const getId = () => (100000 * Math.random()).toFixed(0)

// function used to modify and morph each anecdote into an object of desirable format
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// mapping all the anecdotes as a suitable object with an id and votes p
// const initialState = anecdotesAtStart.map(asObject)

// not put in the modified initialState object as the starting 'state' in the reducer
import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  console.log('anecdotes state now: ', state)
  console.log('action', action)
   
   switch (action.type) {
     case 'INCREASE_VOTES': {
          const changedAnecdote = action.data 
          const id = changedAnecdote.id

       return state
                  .map(anecdote => anecdote.id===id?changedAnecdote:anecdote)
                  .sort((a,b)=> b.votes-a.votes)
     }
     case 'INIT_ANECDOTES': return action.data
     case 'ADD_ANECDOTE': return [...state,action.data]
     default: return state

   }
}
// you return the action object via ACTION CREATOR functions


/* pre redux-thunk

export const increaseVotes =(id)=>({type: 'INCREASE_VOTES', data:{id}})

*/

export const increaseVotes =(id,modifiedAnecdote)=>{
        
       return async dispatch=>{
           
        // first update the anecdote via api call

        const changedAnecdote = await anecdoteService.updateAnecdote(id,modifiedAnecdote)

        // next update the api through action store call

          dispatch({
             type: 'INCREASE_VOTES',
             data : changedAnecdote
          })
       }
        
}
//  the representation of the anecdote object to be added is sent as an
// object attached to data key

/* pre redux-thunk
export const addAnecdote =(anecdote)=>({type:'ADD_ANECDOTE', data:anecdote })
*/


export const addAnecdote = (content)=>{
    
  return async dispatch=>{

      // first the async api call to add note 
       const savedAnecdote = await anecdoteService.addNew(content)
         //first dispatch the action to add the note  

         dispatch({
           type : 'ADD_ANECDOTE',
           data : savedAnecdote
         })
         
  }

}
//  populate all anecdotes once retrieved from the anecdoteService getAll() api call

/* pre redux-thunk
export const initializeAnecdotes =(anecdotes) =>({type:'INIT_ANECDOTES',data:anecdotes})
*/

export const initializeAnecdotes =() =>{

   return async dispatch=>{

         // first retrieve all anecdotes via api call getAll() 
         // and feeding the data got from api call into the store        
        const anecdotes=await anecdoteService.getAll()
        
        // dispatch the action to initialize the anecdotes to the store
           dispatch({
             type :'INIT_ANECDOTES',
             data : anecdotes
           })
   }
      
}

export default reducer