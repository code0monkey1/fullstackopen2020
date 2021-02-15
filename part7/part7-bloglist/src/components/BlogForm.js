import React from 'react'
import blogService from '../services/blogs'
import userService from '../services/users'
import {addUserBlog} from '../reducers/userReducer'
import {useDispatch,useSelector} from 'react-redux'
import {addBlog} from '../reducers/blogReducer.js'
 
const BlogForm = () => {
   
    const dispatch=useDispatch()

    const {loggedInUser,allUsers} = useSelector(state => state.users)

     
    const addNewBlog = async (event) =>{
        console.log(" => addBlog()")
        
        event.preventDefault()
         
         const {target}= event

         const title = target.title.value 
         const author = target.author.value
         const like = Number(target.like.value)
         
         const blog = {title,author,like,userId:loggedInUser.id}
    
        // updateBlogBackend
        const addedBlog = await blogService.addBlog(blog)

        // updateBlogFrontend
         dispatch(addBlog(addedBlog))

          //updateUserBackend
            const userId=addedBlog.userId
            const blogId =addedBlog.id

            const userToChange = allUsers.find(user => userId===user.id)

            const changedUser = {...userToChange , blogs :userToChange.blogs.concat(blogId)}

            const updatedUser = await userService.updateUser(userId,changedUser)
           
            // updateUserFrontend
            dispatch(addUserBlog({userId:loggedInUser.id,updatedUser}))

        
       
       
        clearForm(target)

    }

    const clearForm =(target)=>{

        target.title.value  =''
       target.author.value =''
      target.like.value =0

    }
    

    return (
        <div>
            <form onSubmit={addNewBlog}>
                  Author : <input type="text" name="author" />
                  <br/>
                  Title : <input type="text" name="title"/>
                  <br/>
                  Likes : <input type="number" defaultValue="0" name="like" />
                  <br/>
                  <button type="submit" > Add Blog </button>
            </form>
        </div>
    )
}

export default BlogForm

