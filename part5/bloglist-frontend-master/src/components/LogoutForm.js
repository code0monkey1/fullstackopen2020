import React from 'react'

export default function LogoutForm({ currentUser,logoutUser }) {

  return (
    <div>
            Logout User : {currentUser.name}
      <br/>
      <button onClick={logoutUser} > Logout </button>
    </div>
  )
}
