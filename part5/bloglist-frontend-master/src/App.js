import React, { useState, useEffect ,useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [currentUser,setCurrentUser] = useState(null)
  const [message ,setMessage] = useState('')

  // reference used to access the functions inside the Toggleable component
  const blogFormRef = useRef()

  useEffect(() => {
    const getAllBlogs=() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
    getAllBlogs()

  }, [])



  useEffect(() => {
    // check if user is defined in the localStorage
    const loggedInUser=JSON.parse(window.localStorage.getItem('user'))

    if(loggedInUser){

      setCurrentUser(loggedInUser)

      setMessage(`User ${loggedInUser.name} logged in`)
    }

  },[])

  const loginUser =async (userCredentials) => {
    console.log('=> loginUser()')

    try{
      const user = await loginService.login(userCredentials)
      setCurrentUser(user)
      // always stringify the user object using JSON.stringify
      // so as to be able to correctly retrieve the objects using JSON.parse , later
      window.localStorage.setItem('user',JSON.stringify(user) )
      setMessage(`${user.name} Logged In `)
    }
    catch(error) {
      setMessage(error.response.data.message)
      console.log(error.response.data.message)

    }
  }

  const logoutUser = () => {
    console.log('=> logoutUser()')

    setCurrentUser(null)

    window.localStorage.removeItem('user')
    setMessage('User Successfully logged out !!')
  }

  const addNewBlog = async (newBlog) => {
    console.log('=> addNewBlog()')

    blogFormRef.current.toggleVisibility()

    try{
      const savedNewBlog = await blogService.addBlog(newBlog,currentUser.token)
      console.log('The savedNewBlog is ',savedNewBlog)
      setBlogs(blogs => blogs.concat(savedNewBlog))
      setMessage(`New blog with title ${savedNewBlog.title} has been added`)
    }
    catch(error){

      console.log(error.response.data.message)
      setMessage(error.response.data.message)

    }

  }

  const increaseLikes = async(id) => {
    console.log('=> increaseLikes()')
    // find the blog and modify it
    console.log('id is ',id)

    const blogToUpdate = blogs.find( blog => blog.id===id)

    if(!blogToUpdate){

      console.log('blog not found')
      setMessage('Blog to update not found ! ')
      return

    }
    // add to backend
    try{
      console.log('=> increaseLikes() : happy path taken')
      const updatedBlog = { ...blogToUpdate , likes :blogToUpdate.likes+1 }

      const response =await  blogService.updateBlog(id,updatedBlog)
      // display in notification that operation in successful
      setMessage(response.message)
      // if adding to backend succeeds add to frontend
      const modifiedBlogs = blogs.map( blog => blog.id===id?updatedBlog:blog)

      setBlogs(modifiedBlogs)

    }catch(error){

      console.log(error)
      setMessage(error.response.data.message)

    }

  }

  const removeBlog=async(id) => {

    try{

      //try to delete Blog from backend
      const response = await blogService.deleteBlog(id,currentUser.token)

      // if delete was successful , display message and delete blog from frontend
      setMessage(response.message)

      const modifiedBlogs = blogs.filter( blog => blog.id!==id)

      setBlogs(modifiedBlogs)

    }catch(error){

      console.log(error)

      setMessage(error.response.data.message)

    }




  }
  // this will arrange blogs from max likes to least likes
  const sortedBlogs = blogs.sort((a,b) => b.likes-a.likes)

  return (
    <div>
      <Notification message={message} setMessage={setMessage}/>
      { currentUser ? <LogoutForm currentUser={currentUser} logoutUser={logoutUser}/>:<LoginForm loginUser={loginUser}/> }
      { currentUser && sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} removeBlog={removeBlog}/>) }
      { currentUser &&  <Toggleable ref={blogFormRef} buttonLabel="new blog">  <BlogForm increaseLikes={increaseLikes} addNewBlog={addNewBlog}/> </Toggleable>}
    </div>
  )
}

export default App