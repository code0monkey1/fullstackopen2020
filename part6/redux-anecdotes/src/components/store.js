
// import the file containing all the combined reducers 
import reducer from '../reducers/rootReducer.js' 

// set up the redux toolkit 
import { composeWithDevTools } from 'redux-devtools-extension' 

// import createStore to use the reducer file and create the redux-store 
// applyMiddleware is used for applying redux-thunk 
import { createStore ,applyMiddleware} from 'redux'

// using redux-thunk for combining async and sync operations
import thunk from 'redux-thunk'


// the create store wraps around the reducer and provides access to the store 
const store = createStore(reducer,composeWithDevTools(
    // as redux-thunk is used as a middleware , 
    // applyMiddleware from 'redux' is used for applying redux-thunk 
    applyMiddleware(thunk)
    
    )) // the composeWithDevTools helps us use the redux extension

export default store