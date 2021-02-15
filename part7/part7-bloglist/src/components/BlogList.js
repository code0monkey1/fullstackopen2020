import React from 'react'
import {useSelector} from 'react-redux'

import {Link} from 'react-router-dom'

const BlogList = () => {
   
     const blogs = useSelector(state => state.blogs)
     
     console.log("All blogs are",blogs)

    return (
        <div>
            {blogs.map(blog =>
              <div style={{border: '1px solid black'}}> <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> </div>
      )}
        </div>
    )
}

export default BlogList
