const mongoose = require('mongoose')
    
const connectDB = (url) =>{
    //additional parameters to remove deprecation messages
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

//exporting our db connection function
module.exports = connectDB
