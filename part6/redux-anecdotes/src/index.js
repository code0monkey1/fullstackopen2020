import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './components/store.js'

/*Redux snippets 

rxaction→	redux action template  // used 
rxconst→	export const $1 = '$1'
rxreducer→	redux reducer template // used
rxselect→	redux selector template
rxslice→	redux slice template

*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)