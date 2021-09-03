var express=require("express");
var router=express.Router();
var employees=[];

router.get("/regemployee",function(req,res){
    res.sendFile(__dirname+"/regemployee.html");
})

router.post("/regemployee",function(req,res){
    employees.push(req.body)
    res.send("employee registration successfull")
})

router.get("/emplist",function(req,res){
    res.render("emplist",{
        allemployees:employees
    })
})

module.exports=router;

