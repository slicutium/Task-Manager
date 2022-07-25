//creating custom error class and function

//custom error class extends the built in error class
//calling the super constructor and then 
//we are adding the status code
class CustomAPIError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


//custom error function, it creates an instance of our custom error class
const createCustomError = (msg, statusCode) =>{
    return new CustomAPIError(msg, statusCode)
}

//exporting both the new children class and the function
module.exports = {createCustomError, CustomAPIError}