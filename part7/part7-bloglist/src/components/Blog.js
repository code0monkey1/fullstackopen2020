import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import blogService from '../services/blogs'
import userService from '../services/users'
import {deleteUserBlog} from '../reducers/userReducer'
import {increaseLikes,deleteBlog,addComment} from '../reducers/blogReducer'

const Blog = ({ blog }) =>{
 
    const dispatch=useDispatch()

    const blogs= useSelector(state => state.blogs)
    const {allUsers}= useSelector(state => state.users)
 
     const increaseBlogLikes = async (id)=>{

           console.log("=> increaseBlogLikes()")   

          console.log("The id of the blog ",id)

          const blogToChange = blogs.find( blog => blog.id===id)
          
          console.log("The blog to Change is ",blogToChange)

           const modifiedBlog= {...blogToChange,like:blogToChange.like+1}
       
           const updatedBlog= await  blogService.updateBlog(id,modifiedBlog)     
         
           dispatch(increaseLikes({id,updatedBlog}))

  }

    const deleteABlog = async (blog)=>{
      console.log("=> deleteBlog()")

      const blogId = blog.id
      const userId= blog.userId
      

        console.log(" => deleteBlog()")
      // updateBackend

      await blogService.deleteBlog(blogId)

    // updateFrontend
      
      dispatch(deleteBlog(blogId))
    
     // delete blog from users backend array

        const userToChange = allUsers.find(user => userId===user.id)
        console.log("The user to change is : ",userToChange)

         const changedUser = {...userToChange , blogs :userToChange.blogs.filter( blog => blog!==blogId )}

          const updatedUser = await userService.updateUser(userId,changedUser)

        // delete from users frontend array 
        
        console.log("The user id is",userId)
        console.log("The blog id is",blogId)

        dispatch(deleteUserBlog(updatedUser))
      
  }

  const addBlogComment=async (event)=>{
        event.preventDefault()

        const {target} = event
        
       console.log('The target is ',target)
       console.log('The comment is ',target.comment)

       const comment = target.comment.value

       console.log("The comment is ",comment)

       const changedBlog = {...blog , comments:blog.comments.concat(comment)}
       // save to Db
       const savedBlog= await blogService.updateBlog(blog.id,changedBlog)

       // save to redux

       dispatch(addComment({blogId:blog.id,updatedBlog:savedBlog}))

  }

  return (
  <div>
    <h1>{blog.title}</h1> 
    <div> Like: {blog.like}  </div><br/>
    added by : {blog.author}
    <form onSubmit={addBlogComment}> Add Comment :  <input type="text" name='comment' /> <button type='submit'> Add </button></form>
    <h4>Comments</h4>
    <ul>
    {
      blog.comments.map(comment =><li>{comment}</li>)
    }
  </ul>
     <button onClick={()=>increaseBlogLikes(blog.id)} >Like </button>
     <button onClick={()=>deleteABlog(blog)} >Delete</button>
  </div>
)}

export default Blog
