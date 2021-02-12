
 // make a notificationReducer which  preserves the state of notifications 
 // and modifies the notifications state through actions

const notificationReducer = (state='' ,action )=>{
  
         switch(action.type){

            case 'NOTE_ADDED' : return { message : action.notification, time :action.time||0} 
            default : return state
         }

}

// pre-thunk : create an action creator function which will show the notifications

  // export const setNotification =(notification)=>{
      
             
  //          return {
  //              type:'NOTE_ADDED',
  //              notification
  //          }
  // }

  /* Thunk the notifications  */

  export const setNotification=(message, seconds)=>{
                 
      
                return async dispatch =>{
                   
                     dispatch({
                       type:'NOTE_ADDED',
                       notification:message,
                       time :seconds
                     })

                }
  }



export default notificationReducer

