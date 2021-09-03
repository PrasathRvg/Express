var express=require("express");
var app=express();
var studentRoutes=require('./student.routes.js');
var employeeRoutes=require('./employee.routes.js');
// var students=[];
// var employees=[];
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html");
})

// app.get("/regstudent",function(req,res){
//     res.sendFile(__dirname+"/regstudent.html");
// })

// app.get("/regemployee",function(req,res){
//     res.sendFile(__dirname+"/regemployee.html");
// })

// app.post("/regstudent",function(req,res){
//     students.push(req.body)
//     res.render("stulist",{
//         allstudents:students
//     })
//     res.send("student registration successfull")
// })

// app.post("/regemployee",function(req,res){
//     employees.push(req.body)
//     res.render("emplist",{
//         allemployees:employees
//     })
//     res.send("Employee registration successfull")
// })

app.use("/student",studentRoutes)
app.use("/employee",employeeRoutes)

app.listen(8009,function(req,res){
    console.log("listening on 8009")
})

