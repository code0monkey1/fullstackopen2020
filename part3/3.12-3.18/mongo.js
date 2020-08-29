// import mongoose
const mongoose=require('mongoose')
console.log("Starting to load mongoose !!")
//assimilate all the arguments required for the connection string 
const arguments=process.argv
const password=arguments[2]
const name=arguments[3]
const number=arguments[4]
const database="person"

//define the url string 
const url=`mongodb+srv://fullstack:${password}@cluster0.v6cug.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(url , {useNewUrlParser:true,useUnifiedTopology:true})


// define the schema for mongoose 
const personSchema=new mongoose.Schema({
    name:String,
    number:Number,
    date:Date
})

// make a mode for the object 
const Person= new mongoose.model("Person",personSchema)

// make an object instance of the model 
const person = new Person({
    name,
    number,
    date: new Date()
})

// invalid arguments length condition
if(arguments.length===4 || arguments.length<3 || arguments.length>5){
    console.log("Invalid Arguments length")
    return
}

if(arguments.length===5){
           
            // save the object instance to databse 
            person.save()
            .then( savedPerson =>{
              console.log(" added ", savedPerson.name," number ",savedPerson.number," to phonebook")
            
            //always be sure to close the db connection
            mongoose.connection.close()
            }).catch(error =>{
                console.log("The error is :",error)
            })
} 
if(arguments.length===3){

            // list all the contacts 
            console.log("Phonebook :")
        
            Person.find({})
            .then( persons =>{
                persons.forEach( person =>console.log(person.name," ",person.number))
                mongoose.connection.close()

            }).catch(error=>{
                console.log("The error is :",error)
            })
}

console.log("Monggose loaded!!")
module.exports = Person

