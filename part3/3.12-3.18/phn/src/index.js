console.log("Original file")

require('dotenv').config()

const express=require("express")

// to decode the body
const app= express()

// for morgan logging
var morgan = require('morgan')

// cross origin 
const cors = require('cors')
app.use(cors())

const Person=require("../models/person")

app.use(express.static('build'))

morgan.token('lisa', function (req, res) { 
    return JSON.stringify(req.body)
        }
    )

app.use(express.json())
app.use(morgan(':lisa :method'))

const getNextId=()=>{

        return  Math.max(...persons.map( person => person.id))+1
    }

const isNameAndNumberPresent=(person)=>{
   return person.name && person.number
}

const isNameRepeated=(name)=>{

   const gotName= persons.find( person => person.name===name)
   console.log("The name to be checked is", name,"The name found is ",gotName)
   return gotName
}

let persons=[
        {
            name:"Chiranjeev",
            number :2323,
            id:1
        },
         {
            name:"Aaru",
            number :3423,
            id:2
         }
        ]

app.get("/api/persons",(req,res)=>{
        Person
        .find({})
        .then(persons => {
            // persons.forEach(person => {
            // console.log("Name: ",person.name," Number: ",person.number
            res.send(persons)
        //    });
        } )
        .catch(error=>{
            console.log("Error in Find persons : ",error)
        })
        // res.send(persons)
})


app.get("/info",(req,res,next)=>{
//    let peopleCount;
   Person.find({}).then(persons =>{
       console.log("The count of people is ",persons.length)
    const message =`
    Phonebook has info for ${persons.length} people
    
     ${new Date()}
    `
    res.send(message).end()
    })
    .catch(error=>{
        next(error)
    })
//    console.log("The people count is ",peopleCount)
    // const message =`
    // Phonebook has info for ${Person.find({}).then(person =>person.length)} people
    
    //  ${new Date()}
    // `

})

app.get("/api/persons/:id",(req,res,next)=>{
       
    const id=req.params.id

    Person
    .findById(id)
    .then(person =>{
       
        if(person)
            res.send(person) 
        else
             res.status(404).end()
      
         })
    .catch( error => next(error))

   
})

app.delete("/api/persons/:id",(req,res,next)=>{
    console.log("The request params for delete is ",req.params)
    const id=req.params.id

   console.log("The id to be deleted is ",id)
   
     Person
    .findByIdAndRemove(id)
    .then( person =>{

        if(person)
            res.status(204).end()
        else
            res.status(404).send({ "error":"bad request" })
        
    })
    .catch(error =>{
        console.log("There was an error in the delete function with id",id , "passing to next error handler ,  error: ",error)
        next(error)
        }  )
   
})

app.put("/api/persons/:id",(req,res,next)=>{
    const person =req.body 
    const id=req.params.id
    console.log("The put request for the person ",person, " has been triggered")

    // persons=persons.map( previousPerson => previousPerson.id===id?person:previousPerson)
    // res.send(person)
    const newPerson={
        name:person.name,
        number:person.number,
    }

    Person
    .findByIdAndUpdate(id,newPerson,{new:true})
    .then(updatedPerson =>{
        res.send(updatedPerson).end()
    })
    .catch(error => next(error))


})
app.post("/api/persons",(req,res)=>{
     const person=req.body
     console.log("The person in the body is ",person)
    
     if(isNameAndNumberPresent(person)){

        //  if(isNameRepeated(person.name)){
        //      console.log("The name",person.name," is present ")
        //      return  res.status("400").send({
        //         "error": "name must be unique"
        //     })
        //  }

        const newPerson = new Person({
            date: new Date(),
            name:person.name,
            number:person.number
            })
       
        newPerson
        .save()
        .then( newPerson =>{
            console.log("The saved person is ",newPerson)
            res.send(newPerson).end()
        })
        .catch(error =>{
            console.log("The error detected in saving person , being passed to next error handler: ",error)
            next(error)
        })
      
     }
     else{
         if(!person.name)
         return  res.status("400").send({
             "error": "name empty"
         })
         else
         return res.status("400").send( {
             "error":"the number is empty"})
     }
})

const errorHandler=(error,req,res,next)=>{
         if(error.name==='CastError'){
            return  res.status(400).send({error:"Malformed id"})
         }
        
         next(error)
}

const unknownEndpoint=(req,res)=>[
  res.status(404).send({error:"unknown endpoint"})  
]

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log("The port is being listened to on :",PORT)
})