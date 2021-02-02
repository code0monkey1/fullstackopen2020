import axios from 'axios'

const URL = '/api/login'


const login=async(userCredentials) => { // consists of an object : {username,password}

  const response= await axios.post(URL,userCredentials)

  return response.data
}


export default {
  login
}