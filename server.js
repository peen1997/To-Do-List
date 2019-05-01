const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const tasks = require('./route/api/tasks')
const app = express()

// Bodyparser middleware
app.use(bodyParser.json())

// Connect Database 
const db = require('./config/keys').mongoURI
mongoose
    .connect(db,{useNewUrlParser:true})
    .then(()=>console.log('MongoDB connected...'))
    .catch(err=>console.log(err))

// Use routes
app.use('/api/tasks',tasks)

// Set static assets if in production

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
    

PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
