const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router() 

const User = require('../models/user')


loginRouter.post('/',async (req, res) =>{

    console.log("The login post route reached")
         
    const body = req.body
     
    console.log("The body is ",body)
    const username = body.username

    const user  = await User.findOne({username: username})

    console.log("The found user is ",user)
    
    const correctPassword = user===null?false : await bcrypt.compare(body.password, user.passwordHash)

     
    if(!user){
        return res.status(401).send({message:"user not found "})
    }
    if(!correctPassword){
        return res.status(401).send({message:"password incorrect"})
    }
   
    const userForToken={username:user.username,id:user._id}

    const token = jwt.sign(userForToken,process.env.SECRET_KEY)

    res.status(200).send({token,username:user.username,name:user.name})

})     

module.exports = loginRouter