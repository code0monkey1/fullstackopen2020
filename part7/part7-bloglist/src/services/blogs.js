import axios from 'axios'
const baseUrl = '/blogs'

const getAll = async () => {
  console.log('=> getAll() ')
   const response = await axios.get(baseUrl)

   const data =response.data
   console.log("The blogs are :  ",data)
   return data

}

const updateBlog =async (id,updatedBlog) => {
  console.log('=> updateBlog() ')
  
  console.log("The id is ",id)

  const request = await axios.put(`${baseUrl}/${id}`,updatedBlog)

  const data = request.data 

  console.log("The updated blog is ",data)

  return data

}

const deleteBlog = async (id)=>{

      console.log('=> deleteBlog() ')

      console.log("The id is ",id)

      const response = await axios.delete(`${baseUrl}/${id}`)
      const data = response.data

      console.log("The data is ",data)
      return data
}

const addBlog = async (blog) =>{

    
     console.log('=> addBlog()')

     console.log("The blog is ",blog)

     const response = await axios.post(baseUrl,blog)

     const data = response.data
      
     console.log("The added blog is ",data)
     return data
     
}

export default { getAll ,updateBlog , deleteBlog , addBlog}