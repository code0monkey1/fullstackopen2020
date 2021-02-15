import React from 'react'
import {Switch,Route} from 'react-router-dom'
import UserExpose from './UserExpose'
import App from '../App'
import {useRouteMatch} from 'react-router-dom'
import {useSelector} from 'react-redux'
import BlogDetails from './BlogDetails'
import Nav from './Nav'
import UserDetails from './UserDetails'
import BlogList from './BlogList'

   const Routes =()=>{
   
    const blogs = useSelector(state => state.blogs)
    const {allUsers} = useSelector(state => state.users)
     
    const blogMatch = useRouteMatch('/blogs/:id') // pattern used to blogMatch the route 
    console.log("The blogMatch is " ,blogMatch)

     const foundBlog = blogMatch 
     ? blogs.find(blog => Number(blog.id) === Number(blogMatch.params.id))
    : null

    console.log("The found blog is : ",foundBlog)

        
    const userMatch = useRouteMatch('/users/:id') // pattern used to userMatch the route 
    console.log("The userMatch is " ,userMatch)

     const foundUser = userMatch 
     ? allUsers.find(user => Number(user.id) === Number(userMatch.params.id))
    : null
   

    return (
        <div>   
          

            <Nav/>
               <Switch>
                   
                    <Route exact path="/users">   

                           <UserExpose/>

                    </Route>
                    
                    <Route exact path="/">

                        <App/>
                        
                    </Route>

                    <Route path='/blogs/:id'>
                         
                          <BlogDetails blog={foundBlog}/>

                    </Route>

                    <Route exact path="/users/:id">
                            
                            <UserDetails user={foundUser}/>
                        
                    </Route>

                    <Route exact path='/blogs'>
                              <BlogList />
                    </Route>

 
               </Switch>
        </div>
    )
}

export default Routes
