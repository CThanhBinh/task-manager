const Task = require('../models/schema')

const tasks = {
    home : async(req,res)=>{
        const tasks = await Task.find({})
        res.render('./home',{tasks})
    },
    create : async(req,res)=>{
        const tasks =  new Task(req.body)
        await tasks.save()
        res.redirect('/')
    },
    edit : async(req,res,next)=>{
        const {id} = req.params
        const task = await Task.findById(id)
        if( !task ) throw new Error('not find task')
        res.render('./edit',{task})        
    },
    update : async(req,res)=>{
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(id,req.body)
        if( !task ) throw new Error('not find task')
        res.redirect(`/${id}`)
    },
    delete : async(req,res)=>{
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if( !task ) throw new Error('not find task')
        res.redirect('/')
    }
}

module.exports = tasks