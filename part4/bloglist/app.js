const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/bloglists')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// mongoose connection
logger.info('In app : connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

//express plugins
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

//custom middleware
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//routers
app.use('/api/users',userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login',loginRouter)

//error handling custom middleware
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


module.exports = app