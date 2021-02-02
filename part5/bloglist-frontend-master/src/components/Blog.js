import React, { useState } from 'react'


const Blog = ({ blog ,increaseLikes , removeBlog }) => {

  const [visible , setVisible] = useState(false)

  const toDisplayWhenVisible = { display:visible? '':'none' }

  const toggleVisibility =() => setVisible(!visible)

  return <>
    <div style={{ border:'2px black solid',margin:'4px' }} >
      <div className='doesDisplay'>
        {blog.title}<br/>
        {blog.author}
      </div>
      <div style={toDisplayWhenVisible} className='doesNotDisplay'>
                  Description: {blog.description} <br/>
                  Likes :<span className="like"> {blog.likes} </span> <button onClick={() => increaseLikes(blog.id)}>Increase Likes</button> <br/>
                  URL : {blog.url} <br/>
        <button onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
      <button id='btn' onClick={toggleVisibility}>{visible?'hide':'show'}</button>
    </div>
  </>
}

export default Blog
