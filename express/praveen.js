var express=require("express");
var app=express();
var router=express.Router();
var studentRoutes=require("./student.routes.js");
var employeeRoutes=require('./employee.routes.js');

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.use(express.static(__dirname+"/open"))  

app.use(function(req, res, next){
    console.log("middle ware executed")
    next()
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html");
})  

app.use("/student",studentRoutes)
app.use("/employee",employeeRoutes) 



app.listen(7007,function(req,res){
    console.log("listening on 7007")
})
