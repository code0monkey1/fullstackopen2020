import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {setLoggedInUser} from '../reducers/userReducer'

const Login = () => {
     const dispatch = useDispatch()   
     const {allUsers} = useSelector( state => state.users)

    const userLogin = (event) => {

         console.log('=> loginUser()')    

          event.preventDefault();

         const {target} = event

         const username = target.username.value 
         const password = target.password.value

        const user = {username: username, password: password}

       // if unauthorized user inform
      const authorizedUser = allUsers.find(storedUser => storedUser.username===user.username 
                                                   && storedUser.password===user.password)
                                          
      if(!authorizedUser) {

          dispatch(setNotification("Invalid Username or Password"))
          return ;
      }
  
      // if authorizedUser set the info to loggedInUser
      dispatch(setNotification(`User ${authorizedUser.username} logged In !`))

      dispatch(setLoggedInUser(authorizedUser))

      localStorage.setItem('loggedInUser',JSON.stringify(authorizedUser))
      
    }  
        
       
    return (
        <div>
            <form onSubmit={userLogin}>

               <input type="text" name="username" placeholder="username"/>
               <input type="text" name="password" placeholder="password"/>
              
              <button type="submit" >Login </button>
            </form>
        </div>
    )
}

export default Login

