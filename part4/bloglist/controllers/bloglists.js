
const Blog=require('../models/blog')
const User = require('../models/user')
const jwt= require('jsonwebtoken')
// const logger = require('../models/logger')
const blogRouter=require('express').Router()

blogRouter.get('/', async(request, response) => {
 
 const blogs = await Blog.find({}).populate('user',{name:1,username:1})
  
 response.send(blogs)

})

blogRouter.post('/', async(request, response) => {
   
  console.log("The post request of the blogRouter reached")

  console.log("The token is ",request.token)
  
  const decodedToken = jwt.verify(request.token,process.env.SECRET_KEY)


  if(!decodedToken || !decodedToken.id){
    return response.status(401).send({error:"token missing or invalid"})
  }

  const body = request.body
   
  console.log("The body is ",body)
  const userId = body.user
  
  console.log("The id is",userId)

  const foundUser  = await User.findById(userId)
  console.log("The user is ",foundUser)
   
  console.log("The found user is ",foundUser.toJSON())
  
  const blog = new Blog({
        title :body.title,
        likes:body.likes,
        author: body.author,
        url : body.url,
        user:foundUser._id,
    })

  const savedBlog= await blog.save()
  
  foundUser.blogs = foundUser.blogs.concat(savedBlog._id)

  await foundUser.save()

  response.status(201).send(savedBlog)
 
})

blogRouter.delete('/:id',async(request,response)=>{
     
    const blogId= request.params.id
    console.log("The delete request of the blogRouter reached")

    console.log("The token is ",request.token)
     
    console.log("The secret key is ",process.env.SECRET_KEY)

    const decodedToken = jwt.verify(request.token,process.env.SECRET_KEY)
   
    if(!decodedToken || !decodedToken.id){
      return response.status(401).send({error:"token missing or invalid"})
    }
    
   const blog = await Blog.findById(blogId)
   console.log("The blog is ",blog)

   const user = blog.user
    
   
   console.log("The user is ",user)
   console.log("The decodedToken token is  ",decodedToken)

    if(user.toString()!==decodedToken.id.toString()){

          console.log(`user in blog is`,user.toJSON())
          console.log("The decoded token is ",decodedToken)
          return response.status(401).send({error:"user ID not same in blog and jwt ,hence cant be deleted"})
  }

    await Blog.findByIdAndDelete(blogId)

    response.status(204).end()

})

blogRouter.put('/:id',async(request,response)=>{
  console.log("The post request of the blogRouter reached")

  console.log("The token is ",request.token)
  
  const decodedToken = jwt.verify(request.token,process.env.SECRET_KEY)


  if(!decodedToken || !decodedToken.id){
    return response.status(401).send({error:"token missing or invalid"})
  }

  const id = request.params.id
  const body = request.body

  console.log("Enterd Put block : ")
  console.log("The body in the put block  is : ",body)

  const user = body.user
  
  console.log("The id is",user.id)

  const foundUser  = await User.findById(user.id)
  console.log("The user is ",foundUser)
   
  console.log("The found user is ",foundUser.toJSON())
  

  const newBlog ={
        likes : body.likes,
        title: body.title,
        author: body.author,
        url : body.url,
        user:foundUser._id,
        id:body.id
  }

  console.log("The new blog body is  is : ",newBlog)

  const addedBlog = await Blog.findByIdAndUpdate(id,newBlog,{new:true})

  response.status(200).send(addedBlog)


})

module.exports=blogRouter