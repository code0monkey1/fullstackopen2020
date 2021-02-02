import React, { useState } from 'react'

export default function BlogForm({ addNewBlog }) {

  const [newBlog,setNewBlog]=useState({ author:'',url:'',likes:0,title:'',description:'' })

  const addBlog=async(event) => {

    console.log('=> addBlog()')

    event.preventDefault()

    console.log('The new blog to be submitted is ',JSON.stringify(newBlog))

    await addNewBlog(newBlog)

    setNewBlog({ author:'',url:'',likes:0,title:'',description:'' })

  }

  return (
    <div>
      <h1> New Blog Form </h1>
      <form onSubmit={addBlog} >

                    Author : <input  id="author" type="text" placeholder="author"  value={newBlog.author} onChange={({ target:{ value } }) => setNewBlog({ ...newBlog,author:value })} /><br/>
                    Title : <input id='title' type="text" placeholder="title"  value={newBlog.title} onChange={({ target:{ value } }) => setNewBlog({ ...newBlog,title:value })} /> <br/>
                    Description : <input id="description" type="text" placeholder="description" value={newBlog.description} onChange={({ target:{ value } }) => setNewBlog({ ...newBlog,description:value })} /> <br/>
                    Likes : <input id="likes" type='number' value={newBlog.likes} onChange={({ target:{ value } }) => setNewBlog({ ...newBlog,likes:value })} /> <br/>
                    Url : <input id="url" type='text' placeholder="url" value={newBlog.url} onChange={({ target:{ value } }) => setNewBlog({ ...newBlog,url:value })} />   <br/>

        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}
