const express = require('express')
const app = express()
const methodOverride = require('method-override')
const path = require('path')
const taskRouter = require('./routers/taskRouter')
const engine = require('ejs-mate')

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    console.log('mongoose work')
  await mongoose.connect('mongodb://localhost:27017/TaskManager');
}

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'/views'))

app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

app.use('/',taskRouter)

app.get("*",(req,res,next)=>{
    next(new Error("Page not Found",404))
  })

app.use((err,req,res,next)=>{
    err.status = 500
    if(!err.message) err.message='smt wrong !'
    res.send(`error : ${err.message}, status : ${err.status}`)
})

app.listen(3000,()=>{
    console.log('serve on 3000!')
})