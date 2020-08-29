// import mongoose
const mongoose=require('mongoose')

//assimilate all the arguments required for the connection string 
const arguments=process.argv

//define the url string 
const url=process.env.MONGO_URL

mongoose.connect(url , {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})


// define the schema for mongoose 
const personSchema=new mongoose.Schema({
    name:String,
    number:Number,
    date:Date,
    id:String
})

//modify the jsonObject

personSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// make a mode for the object 
const Person= new mongoose.model("Person",personSchema)

// make an object instance of the model 
// const person = new Person({
//     name,
//     number,
//     date: new Date()
// })

// invalid arguments length condition
// if(arguments.length===4 || arguments.length<3 || arguments.length>5){
//     console.log("Invalid Arguments length")
//     return
// }

// if(arguments.length===5){
           
//             // save the object instance to databse 
//             person.save()
//             .then( savedPerson =>{
//               console.log(" added ", savedPerson.name," number ",savedPerson.number," to phonebook")
            
//             //always be sure to close the db connection
//             mongoose.connection.close()
//             }).catch(error =>{
//                 console.log("The error is :",error)
//             })
// } 
// if(arguments.length===3){

//             // list all the contacts 
//             console.log("Phonebook :")
        
//             Person.find({})
//             .then( persons =>{
//                 persons.forEach( person =>console.log(person.name," ",person.number))
//                 mongoose.connection.close()

//             }).catch(error=>{
//                 console.log("The error is :",error)
//             })
// }

module.exports = Person

