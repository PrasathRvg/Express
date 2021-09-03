var express=require("express");
var router=express.Router();
var students=[];

router.get("/regstudent",function(req,res){
    res.sendFile(__dirname+"/regstudent.html");
})

router.post("/regstudent",function(req,res){
    students.push(req.body)
    res.send("student registration successfull")
})

router.get("/studentlist",function(req,res){
    res.render("stulist",{
        allstudents:students
    })
})


module.exports=router;