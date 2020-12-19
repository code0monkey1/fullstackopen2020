require('dotenv').config()

const PORT =process.env.PORT

console.log("The port is ",PORT)

const MONGODB_URI= process.env.NODE_ENV==='test'?process.env.TEST_MONGODB_URI:process.env.MONGODB_URI

console.log("The mongodbUri is : ",MONGODB_URI)

module.exports={
    PORT,
    MONGODB_URI
}
