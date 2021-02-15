import blogService from '../services/blogs'

const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case `INIT_BLOGS`:
        return payload 
    
    case `INCREASE_LIKES`:{ 
       
        const {id,updatedBlog} = payload

        return state.map( blog => blog.id===id?updatedBlog:blog)
    }
    case `DELETE_BLOG`:{ 
        console.log( '()=> `DELETE_BLOG` switch redux statement' )

        const id =payload
        console.log("The id to delete is ",id)
        return state.filter( blog => blog.id!==id)
            
    }

    case `ADD_BLOG` :{
        console.log( '()=> `ADD_BLOG` switch redux')
        const blog = payload

        return [...state, blog]
    }
    case `ADD_COMMENT`:{
          console.log( '=> `ADD_COMMENT` switch redux')
           const {blogId}=payload
           const {updatedBlog}=payload
         
           console.log("The blog id is ",blogId)
           console.log("The updated blog is ",updatedBlog)
           
           return state.map( blog => blog.id===blogId?updatedBlog:blog)
    }
        
    default:
        return state
    }
}


/* thunkify */

  export const initializeBlogs =(blogs)=>{
 

    return async dispatch =>{
        
         const blogs = await blogService.getAll().then(blogs =>blogs)
  

        dispatch({
        type: `INIT_BLOGS`,
        payload:blogs
      })
  }
}

export const increaseLikes =(payload) =>({
       type : `INCREASE_LIKES`,
       payload 
})



// export const increaseLikes = () => {
  
// }


export const deleteBlog = (payload) => ({
    type: 'DELETE_BLOG',
    payload
})

export const addBlog = (payload) => ({

    type : 'ADD_BLOG',
    payload
})

export const addComment = (payload) => ({
    type: 'ADD_COMMENT',
    payload
})


/* thunkify */

// export const addBlog = (blog) =>{

//    return async dispatch =>{
    
//     const savedBlog = await blogService.addBlog(blog)

//        dispatch({
//            type :'ADD_BLOG',
//            payload: savedBlog
//        })
//    }
    
// }
