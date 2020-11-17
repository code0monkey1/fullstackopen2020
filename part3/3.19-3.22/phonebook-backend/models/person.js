/* eslint-disable no-undef */
require('dotenv').config()

const mongoose=require('mongoose')

//connect to MongoDB URL string

const url = process.env.MONGODB_URI

mongoose.connect(url ,{ useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true })
  .then(res => console.log('server started !!',res))
  .catch(err => console.log('error:'+err))


// define schema for the datatype
var uniqueValidator = require('mongoose-unique-validator') // external validator used only allow unique names to be saved



const personSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:3,
    unique:true // will ensure that only unique names are stored using the POST request
  },
  number:{
    type : Number,
    validate: {
      validator(v) {
        return v.toString().length>=8
        //  return /d{10}/.test(v);
      },
      message: '{VALUE} is not a valid 8 digit number!'
    },
    required : true,

  }
})

personSchema.plugin(uniqueValidator)

// Changing the way the data is shown
personSchema.set('toJSON', {
  // this format will be applied to all the retrieved notes from notesSchema
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()  // explicitly tranforms the id to string
    delete returnedObject._id
    delete returnedObject.__v
    console.log('toJSON() called on object')
  }
})



// create model using schema
const Person= mongoose.model('Person',personSchema)

// export the schema , so that you can perform CRUD operations
module.exports=Person


// if(process.argv.length===2){

//   /* Retrieveing contacts from database */

//     Contact.find({}).then(result => {
//          console.log("The result is ",result)
//          console.log(`Phonebook : \n`)
//          result.forEach( contact =>{
//              console.log(contact.name+' '+contact.number)
//          })
//          mongoose.connection.close()

//         }).catch(error =>{
//             console.log("The error in retrieveing is ",error)
//         })

//         return
// }

//     const name=process.argv[2]
//     const number=process.argv[3]


// a contact data object which is modeled after the contact Schema
// const person = new Person({
//     name:"Another test",
//     number:2342342
// })

/*---------------------------------------*/
/* Saving the contact to database */

// person.save().then(result =>{
//     console.log(`Contact Saved !! \n`)

//     console.log("Saved Contact is : " , result)

//     mongoose.connection.close()
// })

/*---------------------------------------*/

/*---------------------------------------*/
/* Retrieveing contacts from database */

// Contact.find({}).then(result => {
//       result.forEach( contact =>{
//           console.log(contact)
//       })
//       mongoose.connection.close()
// })
/*---------------------------------------*/