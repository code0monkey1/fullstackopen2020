import React,{useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


const Notification = () => {
   
   const notification = useSelector( state => state.notification)


   const dispatch = useDispatch()
   const timeout = useRef()


   if(notification==='')return <div></div>   
  

    clearTimeout(timeout.current)

    timeout.current= setTimeout(() =>{

            dispatch(setNotification(''))
    },
    3000)
    
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>

    )
}

export default Notification
