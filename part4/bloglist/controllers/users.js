const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()


userRouter.post('/',async(req,res)=>{

    const body = req.body

    const password = body.password

    const passwordHash = await bcrypt.hash(password,10)

    if(!password){
      return  res.status(400).send({error: 'password not supplied'})
    }

    if(password.length<3){
        return res.status(400).send({error: 'password lenght less than 3'})
    }
    
    const user = new User({
        username:body.username,
        name:body.name,
        passwordHash
    })

  const newUser= await user.save()

  res.send(newUser)
})

userRouter.get('/',async(req,res)=>{
       
          const users = await User.find({}).populate('blogs')

          res.send(users)

})



module.exports=userRouter