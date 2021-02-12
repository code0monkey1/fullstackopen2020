import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

// the  reducer is wrapped in createStore to access the store ( initialState )
// via the reducer function
const store = createStore(reducer)

const App = () => {
 
 // the dispatch objects that change the store value
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad =()=>{
   store.dispatch({
     type : 'BAD'
   })
  }

  const neutral = () => {
    store.dispatch({
      type :'OK'
    })
  }

  const zero = () => {
     store.dispatch({
       type : 'ZERO'
     })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

// since there is not index.js page to render the app on startup 
// the renderApp() method is called to do the  same

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
// this will have to be called right at the start 
renderApp() 

store.subscribe(renderApp) // this subscribe function will trigger every time the state of the store is changed
