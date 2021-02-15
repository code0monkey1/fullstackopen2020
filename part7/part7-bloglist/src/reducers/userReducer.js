import userService from '../services/users'

const initialState = {
   allUsers : [],
   loggedInUser:null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case `SET_LOGGED_IN_USER`:
        return { ...state, loggedInUser:payload }
    case `INITIALIZE_USERS`:
        return { ...state, allUsers:payload }
    case `LOGOUT_USER` :
        return {...state,loggedInUser:null}
    case `DELETE_USER_BLOG` :{
          console.log(`DELETE_USER_BLOG switch statement entered `)

           const updatedUser = payload
           
           const {allUsers} = state

           return {...state, allUsers:allUsers.map(user => user.id===updatedUser.id?updatedUser:user)}
    }
    case `ADD_USER_BLOG`:{
            console.log(`ADD_USER_BLOG switch statement entered`)

           const {userId,updatedUser} = payload

           const {allUsers} = state

           return {...state, allUsers:allUsers.map(user => user.id===userId?updatedUser:user)}     
            
    }
    default:
        return state
    }
}


export const setLoggedInUser = (payload) => ({
    type: `SET_LOGGED_IN_USER`,
    payload
})


export const setUsers =(payload) => ({

      type: `SET_USERS`,
      payload

})

export const initializeUsers =() =>{

     return async dispatch => {

     const users = await userService.getAll().then(users =>users)

       dispatch({
            type:`INITIALIZE_USERS`,
            payload:users
       })
    
     }

}

export const logoutUser = () => ({
       
      type : `LOGOUT_USER`,
      
})

export const deleteUserBlog = (payload) => ({
    type: `DELETE_USER_BLOG`,
    payload
})

export const addUserBlog = (payload) => ({
    type: `ADD_USER_BLOG`,
    payload
})


