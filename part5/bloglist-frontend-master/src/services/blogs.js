import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog=async(newBlog,token) => {

  console.log('=> addBlog() ')

  const config = { headers: { Authorization: 'Bearer ' + token } }
  const response = await axios.post(baseUrl,newBlog,config)

  return response.data
}

const updateBlog=async(id,modifiedBlog) => {
  console.log('=> updateBlog() ')
  const response = await axios.put(`${baseUrl}/${id}`,modifiedBlog)

  return response.data

}

const deleteBlog =async(id,token) => {

  console.log('=> deleteBlog() ')

  const config= { headers: { Authorization: 'Bearer ' +token } }

  const response = await axios.delete(`${baseUrl}/${id}`,config)

  return response.data
}

export default { getAll ,addBlog , updateBlog ,deleteBlog }