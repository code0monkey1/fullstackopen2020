require('dotenv').config()

const express = require('express')

const app = express()


// --- setting for integrating backend to frontend

const cors=require('cors')

app.use(cors())

app.use(express.static('build'))

// ---

app.use(express.json()) // required to parse request body


// eslint-disable-next-line no-undef
const PORT = process.env.PORT// port picked up from process , when deployed to heroku

const morgan= require('morgan')


morgan.token('type', function (req) { return  JSON.stringify(req.body) }) // custom token type defined !!

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))



// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number :1111111
//   },
//   {
//     id: 2,
//     name: "Bear",
//     number : 222222
//   },
//   {
//     id: 3,
//     name: "Cow",
//     number: 33333
//   }
// ]

const Person=require('./models/person')

// const getId=()=>{

//     const maxId= Math.max( ...persons.map(person => person.id))

//     return maxId+1

// }

app.post('/api/persons',(request,response,next) => {

  const body=request.body
  console.log('The post request body is ',request.body)

  // if(!body.name || !body.number){
  //     response.send({error:'Name or number is missing !! '})
  //     return
  // }

  const person = new Person({
    name:body.name,
    number:body.number
  })


  person
    .save()
    .then(savedPerson => {
      console.log('savedPerson', savedPerson)
      response.send(savedPerson)
    })
    .catch(error => {
      console.log('There is an error in saving the person :'+error.message)
      next(error)
    })

  // const nameIsPresent= persons.some(person => person.name===name)

  // if(nameIsPresent){
  //     return response.send({ error: 'name must be unique' })
  // }

  // const person={
  //     name,
  //     number,
  //     id:getId()
  // }


  // persons=persons.concat(person)


})

app.get('/info',(request,response,next) => {

  Person
    .find({}).then(persons => {
      response.send('Phonebook has info for ' + persons.length +' people ' + ' \n '+ Date())
    })
    .catch(error => {
      next(error)
    })



})

app.get('/api/persons',(request,response) => {
  Person.find({})
    .then(entries => {
      response.send(entries)
    })

  // response.send(persons)
})

app.get('/api/persons/:id',(request,response,next) => {

  // const id=Number(request.params.id)

  const id= request.params.id

  Person.findById(id).then(foundPerson => {

    if(!foundPerson){
      response.status(404).end()
    }
    else{
      response.status(200).send(foundPerson)
    }


  }).catch(error => {
    next(error)
  })
  // const person = persons.find( person => person.id===id)

  // if(!person){
  //    response.status(404).send({error:"Person not found"})
  // }


})

app.delete('/api/persons/:id',(request,response,next) => {
  // const id=Number(request.params.id)

  // persons=persons.filter(person => person.id!==id)

  const id=request.params.id

  Person.findByIdAndRemove(id)
    .then(deletedPerson => {
      if(!deletedPerson){
        return response.status(400).send('User has already been deleted')
      }
      console.log('deletedPerson', deletedPerson)
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })


})

app.put('/api/persons/:id',(request,response,next) => {
  //  const id=Number(request.params.id)

  const id=request.params.id

  const body=request.body

  const number=body.number
  const name=body.name


  const person={
    name,
    number
  }

  let opts = {
    new:true,
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
    context: 'query'
  }


  Person.findByIdAndUpdate(id,person,opts)
    .then(updatedPerson => {
      console.log('updatedPerson', updatedPerson)
      response.send(updatedPerson)
    })
    .catch(error => next(error))

  //  const  person=persons.find(person => person.id===id)

  //  const modifiedPerson={...person,number}

  //  persons=persons.map(person =>person.id===id?modifiedPerson:person)



})

const incorrectIdFormat=(error,request,response,next) => {

  if(error.name==='CastError'){
    return response.status(400).send({ error:'Malformed Id' })
  }
  else if (error.name==='ValidationError'){
    console.log('Validation error occoured in backend : ',error.message)
    return response.status(400).send({ error:error.message })
  }
  next(error)
}

app.use(incorrectIdFormat)

const unknownEndpoint=(request,response) => {

  response.status(404).send({ error:'Reached unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT,() => {

  console.log('The server is listening to port ',PORT)
})
