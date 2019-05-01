const express = require('express')
const Router = express.Router()

// Import Model 
const Task = require('../../models/task')

// Build API
Router.post('/',(req,res)=>{
    const tasks = new Task({
        name : req.body.name,
    }).save()
      .then(tasks => res.json(tasks))
})

Router.get('/',(req,res)=>{
    Task.find()
    .sort({date :-1})
    .then(tasks => res.json(tasks))
})

Router.delete('/:id',(req,res)=> {
    Task.findById(req.params.id)
    .then(task => task.remove().then(()=>res.json({success:true})))
    .catch(err=> res.status(404).json({success:false}))
})
module.exports = Router