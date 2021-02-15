import React from 'react'
import LoggedInUser from './LoggedInUser'
import Login from './Login'
import Logout from './Logout'
import Notification from './Notification'
import {useSelector} from 'react-redux'

const Header = () => {
 const {loggedInUser}   = useSelector(state => state.users)
    return (
        <div>
               { loggedInUser ? <LoggedInUser /> : <Login /> }
              { loggedInUser && <Logout />}
              <Notification />
        </div>
    )
}

export default Header
