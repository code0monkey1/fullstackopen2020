import React from 'react'
import {useSelector} from 'react-redux'

const LoggedInUser = () => {
   const usersState = useSelector( state => state.users )

  const loggedInUser = usersState.loggedInUser

    if(!loggedInUser)return <div></div>



    return (
        <div>
           Logged In User : {loggedInUser.username}
        </div>
    )
}

export default LoggedInUser
