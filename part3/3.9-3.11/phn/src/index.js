console.log("Index file run ")


const express=require("express")

// to decode the body
const app= express()

// for morgan logging
var morgan = require('morgan')

// cross origin 
const cors = require('cors')
app.use(cors())

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
      
        res.send(persons)
})


app.get("/info",(req,res)=>{
    
    const message =`
    Phonebook has info for ${persons.length} people
    
     ${new Date()}
    `

     res.send(message)
})

app.get("/api/person/:id",(req,res)=>{
       
    const id=Number(req.params.id)

    const person=persons.find(person => person.id===id)

    if(person)
      res.send(person) 
    else
        res.status("404").end()
    
})

app.delete("/api/persons/:id",(req,res)=>{
    const id=Number(req.params.id)

    const person=persons.find( person => person.id===id)

    if(person){
        persons=persons.filter(person=> person.id!==id)
        res.send(persons)
    }
    else{
        res.status("404").send({
            "error":"bad request"
        })
    }
})
app.put("/api/persons/:id",(req,res)=>{
    const person =req.body 
    const id=Number(req.params.id)
    console.log("The put request for the person ",person, " has been triggered")

    persons=persons.map( previousPerson => previousPerson.id===id?person:previousPerson)
    res.send(person)
})
app.post("/api/persons",(req,res)=>{
     const person=req.body
     console.log("The person in the body is ",person)
    
     if(isNameAndNumberPresent(person)){

         if(isNameRepeated(person.name)){
             console.log("The name",person.name," is present ")
             return  res.status("400").send({
                "error": "name must be unique"
            })
         }
         person.id= getNextId()
         person.date= new Date()
         persons=persons.concat(person)
         res.send(person)
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
const PORT=process.env.PORT||3001

app.listen(PORT,()=>{
    console.log("The port is being listened to on :",PORT)
})