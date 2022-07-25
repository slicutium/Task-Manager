//importing data model
const Task = require('../models/Task')

//importing our async wrapper, custome made to avoid repeating try catch blocks
const asyncWrapper = require('../middleware/async')

//importing our custom error function
const {createCustomError} = require('../errors/custom-error')

//controllers using our async wrapper

const getAllTasks = asyncWrapper (async (req, res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
    //other options
    //res.status(200).json({tasks, amount:tasks.length})
    //res.status(200).json({success: true, data:{tasks,nbHits:tasks.length}})
    //res.status(200).json({status: 'success', data:{tasks,nbHits:tasks.length}})
})

const createTask = asyncWrapper(async (req, res) =>{
    
    const task = await Task.create(req.body)
    res.status(201).json({task})   
})

const getTask = asyncWrapper(async (req, res, next) =>{
    const {id:taskID} = req.params
    // can use findOne({_id:req.params.id})
    const task = await Task.findById(taskID)
    //findById returns null if not found
    //we have to check if the return was null
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task})
})


const deleteTask = asyncWrapper(async (req, res) =>{
    const {id:taskID} = req.params
    const task = await Task.findByIdAndDelete(taskID)
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task})   
})

const updateTask = asyncWrapper(async (req, res) =>{
    const {id:taskID} = req.params
    const task = await Task.findByIdAndUpdate(taskID, req.body,{
        new: true,
        runValidators:true
    })
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task})
})

//exporting the controllers
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}