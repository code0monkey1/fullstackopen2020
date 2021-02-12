import React,{useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer.js'

const Notification = () => {
  
  const dispatch =useDispatch()
  const notification = useSelector(state =>state.notification)
  
  const message = notification.message
  const seconds = notification.time

  console.log("The message is ",message)
  console.log("The time is ",seconds)
  /*
  you can't do it render that way. const timeoutRef = useRef(); and clearTimeout(timeoutRef.current) 
  would work

  timeoutRef.current = setTimeout(...)

  if you do  clearTimeout(timeout) the norman way ,
  The component recreates the timeout variable each time in the components scope, 
  so the cleartimeout has no effect. 
  */
  const timeout = useRef()

  if(message==='')return <div> </div>
  

  clearTimeout(timeout.current)

  timeout.current= setTimeout(() =>{

        dispatch(setNotification(''))
   },
   seconds *1000)
  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification