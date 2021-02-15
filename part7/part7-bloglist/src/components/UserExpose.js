import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
const UsersExpose = () => {
     
  const {allUsers} = useSelector( state => state.users)

  

    return (
        <div>
          <h1> Users</h1>

          <table style={{border: '1px solid black'}}> 
                <thead> <tr> <td>User </td>  <td> blogs created</td> </tr> </thead>
                <tbody> 
                    {allUsers.map( user => <Link to={`/users/${user.id}`}>
                    
                             <tr key={user.id}>  <td> {user.username} </td>   <td>{user.blogs.length} </td>  </tr>
                            
                             </Link> )}
                </tbody>
          </table>
        </div>
    )
}

export default UsersExpose
