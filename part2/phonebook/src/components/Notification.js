import React from 'react'

const Notification =({notification,entryValid})=>{
    if(notification===null){
        return(<div>

        </div>)
    }
    return(
     
     <div 
        className={entryValid?"validEntry":"error"}>
         {notification}
     </div>


    )
}

export default Notification;