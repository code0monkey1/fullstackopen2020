import notificationReducer from '../reducers/notificationReducer'
import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'

import {combineReducers} from 'redux'

// combineReducers hook makes an object with keys as desired and values to be all the reducers
const reducer = combineReducers({ 
                                  anecdotes:anecdoteReducer ,
                                  notification:notificationReducer ,
                                  filter:filterReducer
                                })

export default reducer 