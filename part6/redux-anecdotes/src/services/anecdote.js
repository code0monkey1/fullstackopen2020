import axios from 'axios'

const URL = 'http://localhost:3001/anecdotes'

const getAll=async()=>{
   console.log('=> getAll() get api triggered')
     
   const response =  await axios.get(URL)
   const data = response.data
   console.log("retrieved data :",data)
   return data

}

const addNew = async(content)=>{

   console.log('=> addNew() add api triggered')
   
   const newObj ={
       content,
       votes:0
   }
   const response = await axios.post(URL,newObj)
   
   const data = response.data

   console.log("retrieved data :",data)

   return data

}

const updateAnecdote = async (id , modifiedAnecdote) =>{

    console.log('=> updateAnecdote() put api triggered')

    const response = await axios.put(`${URL}/${id}`,modifiedAnecdote)
    
    const data = response.data

    console.log("retrieved data after updating :",data)
    
    return data

}

const apiCalls = { getAll, addNew, updateAnecdote }

export default apiCalls