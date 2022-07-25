
//express
const express = require('express')
const app = express()

//routes
const tasks = require('./routes/tasks')

//db connection
const connectDB = require('./db/connect')
//dotenv package to keep our .env file and keep our secrests.
require('dotenv').config()

//port either set as env variable or default 3000
const port = process.env.PORT || 3000

//custom middleware
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.get('/hello', (req,res)=>{
    res.send('Task Manager App')
})
//using the routers
app.use('/api/v1/tasks',tasks)
//  app.get('/api/v1/tasks')        -get all the tasks
//  app.post('/api/v1/tasks')       -create a new task
//  app.get('/api/v1/tasks/:id')    -get single task
//  app.patch('/api/v1/tasks/:id')  -update task
//  app.delete('/api/v1/tasks/:id') -delete task       

//using custom middleware
app.use(notFound)
app.use(errorHandlerMiddleware)


//only start the server if the mongo db connection was successful

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server listening in port ${port}...`)
        })
    } catch(error) {
        console.log(error)
    }
}

start()
