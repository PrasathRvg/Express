var express=require("express");
var app=express();
var router=express.Router();
var studentRoutes=require("./student.routes.js");
var employeeRoutes=require('./employee.routes.js');

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html");
})  

app.use("/student",studentRoutes)
app.use("/employee",employeeRoutes) 

// router.get("/studentlist/fulldetails",function(req,res){
//     res.render("post",{
//         allstudents:students
//     })
// })

app.listen(7007,function(req,res){
    console.log("listening on 7007")
})
