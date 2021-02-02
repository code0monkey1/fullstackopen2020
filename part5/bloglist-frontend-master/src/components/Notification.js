import React from 'react'

export default function Notification({ message ,setMessage }) {

  setTimeout(() => {

    setMessage('')

  },3000)

  return (
    <div>
      { message && <h1 style={{ color:'red' }}>{message}</h1> }
    </div>
  )
}
