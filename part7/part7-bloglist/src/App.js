import React, { useEffect } from 'react'
import {initializeBlogs} from './reducers/blogReducer'
import {initializeUsers} from './reducers/userReducer'
import {setLoggedInUser} from './reducers/userReducer' 
import {useDispatch ,useSelector} from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const state = useSelector(state => state)
  const {loggedInUser} = useSelector( state => state.users )

  const dispatch = useDispatch()

  useEffect(() => {

    // initializeBlogs
    dispatch(initializeBlogs())

    //initializeUsers
    dispatch(initializeUsers())
     
    // check if user is logged in
    const loggedInUser = localStorage.loggedInUser 

    if(loggedInUser)dispatch(setLoggedInUser(JSON.parse(loggedInUser)))
  
    }
  , [dispatch])

 console.log( ' The state is : ',state)
  return (
    <div>
      <h2>blogs</h2>
 
      { loggedInUser && <BlogList /> }
      { loggedInUser && <BlogForm /> }
     
    </div>
  )
}


export default App