import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes]=useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  const maxIndex=votes.indexOf(Math.max(...votes));
   console.log("The votes length equal to anecdotes length",
   votes.length===anecdotes.length?"true":`votes:${votes.length} anecdotes:${anecdotes.length}`)
  
   const nextAnecdote=()=>{
      const index= Math.floor(Math.random() *anecdotes.length)
      setSelected(index)
      console.log("the length is ",anecdotes.length)
      console.log("The index is ",index)
  }
  const voteAnecdote=()=>{
     const copy=[...votes]
     console.log("the initial votes is ",votes)
     
     copy[selected]+=1;
      setVotes(copy)
    console.log("The index of anecdote is",selected)
    console.log("the changed votes object is ",copy)
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      {props.anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      
      <button onClick={voteAnecdote}> vote </button>
      <button onClick={nextAnecdote}> next anecdote </button>
     <br/>

     <h1> Anecdote with most votes </h1>
     <br/>
     {props.anecdotes[maxIndex]}
     <br/>
     has {votes[maxIndex]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)