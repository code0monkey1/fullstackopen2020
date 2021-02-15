import axios from 'axios'
const baseUrl = '/users'

const getAll = async () => {
  console.log('=> getAll() ')
   const response = await axios.get(baseUrl)

   const data =response.data
   console.log("The users are : ",data)
   return data

}

const updateUser= async(id,changedUser) => {
  console.log('=> updateUser() ')

  const response = await axios.put(`${baseUrl}/${id}`,changedUser)
  const data = response.data
  console.log("The updatedUser is: ",data)

  return data
  

}

export default { getAll,updateUser}