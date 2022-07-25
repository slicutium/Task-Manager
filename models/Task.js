const mongoose = require('mongoose')

//structure for our data
//and initial data validation
//on every field from our schema we are setting validation
//insipient validation, not for production
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
    }, 
    completed:{
        type: Boolean,
        default: false,
    }
})

//exporting the model
module.exports = mongoose.model('Task',TaskSchema)