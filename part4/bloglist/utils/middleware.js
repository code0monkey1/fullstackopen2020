const logger= require('./logger')

const requestLogger=(request,response,next)=>{
    logger.info("request logger middlewear reached")

    logger.info("Body : ",request.body)
    logger.info("Path : ",request.path)
    logger.info("Method : ",request.method)
    logger.info("---")

    next()
}

const tokenExtractor= (request,response,next)=>{
       console.log("tokenExtractor middlewear reached")

       
        const authorization = request.get('authorization')
       
        console.log("The request authorization is ",authorization)
        if(authorization && authorization.toLowerCase().startsWith('bearer ')){
           request.token= authorization.substring(7)
        }

        next()
      
}
const errorHandler =(error , request , response , next )=>{
       logger.info("errorHandler middlewear reached")

       logger.error(error.message)

            if (error.name === 'CastError') {
                return response.status(400).send({ error: 'malformatted id' })
            } else if (error.name === 'ValidationError') {
                console.log("Validation error middlewear reached")
                return response.status(400).json({ error: error.message })
            }
            else if (error.name==='JsonWebTokenError') {
                console.log("jwt Invalidation  middlewear reached ")
                return response.status(400).json({ error:" password or json web token invalid"})
            }
          
            next(error)

}

const unknownEndpoint = ( request , response )=>{
        logger.info("end point middleware reached")
       
       return  response.status(404).send({error:"unknown endo point"})
}

module.exports={
    requestLogger,
    errorHandler,
    unknownEndpoint,
    tokenExtractor
}