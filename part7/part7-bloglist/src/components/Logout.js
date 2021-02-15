import React from 'react'
import {useDispatch} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {logoutUser} from '../reducers/userReducer'

const Logout = () => {
       
    const dispatch = useDispatch()
     
    const logoutUserCurrentUser =()=>{

        dispatch(setNotification('User logged Out '))

        localStorage.removeItem('loggedInUser')
      
        dispatch(logoutUser())

    }

    return (
        <div>
            <button onClick={logoutUserCurrentUser}>Logout</button>
        </div>
    )
}

export default Logout
