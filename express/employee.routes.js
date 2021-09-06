var express=require("express");
var router=express.Router();
var employees=[];
var employees = [];
var employees = [
    {
        fullname: 'aravind',
        email: 'aravind@gmail.com',
        mobile: 1111,
        city: 'chennai',
        technology: 'sys engineer',
        industry: 'software'
    },
    {
        fullname: 'yokesh',
        email: 'yoki@gmail.com',
        mobile: 2222,
        city: 'chennai',
        technology: 'sys engineer',
        industry: 'software'
    },
    {
        fullname: 'ravinder',
        email: 'ravi@gmail.com',
        mobile: 3333,
        city: 'chennai',
        technology: 'linux op',
        industry: 'it'
    },
    {
        fullname: 'sedhu',
        email: 'sed@gmail.com',
        mobile: 4444,
        city: 'thiruvallur',
        technology: 'developer',
        industry: 'it'
    }
];

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

router.get("/empdetails/:x",function(req,res){
    var emp=employees.filter((e,i)=>{
        if(e.mobile==req.params.x)
        return true
        else
        return false
    })
    res.render("empdetails",{
        details:emp
    })
})


module.exports=router;

