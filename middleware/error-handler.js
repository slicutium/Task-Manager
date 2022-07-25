//Custom error handler
//we first import the customAPIError class
//we are going to use the instanceof function to compare the received error
//if it is an instance of then we procede with our custom return
//if it isnt we handle it with a 500 status code and generic message

const { CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:'Something went wrong, please try again'})
}


//exports the middleware
module.exports = errorHandlerMiddleware