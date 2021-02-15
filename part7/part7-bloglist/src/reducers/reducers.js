import blogReducer from './blogReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

import {combineReducers} from 'redux'

const reducers = combineReducers({blogs:blogReducer,users:userReducer,notification:notificationReducer})

export default reducers

