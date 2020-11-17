// require('dotenv').config()

// const mongoose=require('mongoose')


// const password=process.env.PASSWORD
// const database=process.env.DATABASE


// const url = `mongodb+srv://fullstack:${password}@cluster0.pjsjf.mongodb.net/${database}?retryWrites=true&w=majority`

// // define schema

// const contactSchema= new mongoose.Schema({
//     name:String,
//     number:Number
// })

// // create model using schema

// const Contact= mongoose.model('Contact',contactSchema)

// mongoose.connect(url ,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})


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


//     // a contact data object which is modeled after the contact Schema
//     const contact = new Contact({
//         name,
//         number
//     })

//     /*---------------------------------------*/
//     /* Saving the contact to database */

//     contact.save().then(result =>{
//         console.log(`Contact Saved !! \n`)

//         console.log("Saved Contact is : " , result)

//         mongoose.connection.close()
//     })

// /*---------------------------------------*/

// /*---------------------------------------*/
// /* Retrieveing contacts from database */

// // Contact.find({}).then(result => {
// //       result.forEach( contact =>{
// //           console.log(contact)
// //       })
// //       mongoose.connection.close()
// // })
// /*---------------------------------------*/