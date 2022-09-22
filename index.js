const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose =require("mongoose");
const Todo=require("./models/todo");
const { response, request } = require("express");
const { findByIdAndDelete } = require("./models/todo");

app.set("view engine","ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const dburl="mongodb://localhost:27017/tododb"
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});

app.get("/",(req,res)=>{
    Todo.find()
    .then(result=>{
        response.render("index",{data:result})
        console.log(result)
    })
})
app.post("/",(req,res)=>{
    const todo=new Todo({
        todo : request.body.todoValue
    })
    todo.save().then(result=>{
        response.redirect("/")
    })
})


app.listen(8000,()=>{
    console.log("server is running on 8000")
})