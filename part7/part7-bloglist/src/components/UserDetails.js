import React from 'react'
import {useSelector} from  'react-redux'

const UserDetails = ({user}) => {

    console.log("The user is ",user)
    const blogs = useSelector(state => state.blogs)


    const getBlogTitle =(id)=>{
              
        const blog=  blogs.find(blog => blog.id===id)
        return blog.title

    }
      
    return (
        <div>
            <h1>{user.username}</h1>
             <br/>
            <h3>added blogs</h3>

            <ul>
               {user.blogs.map( blogId => <li>{getBlogTitle(blogId)}</li>)} 
            </ul>
        </div>
    )
}

export default UserDetails
