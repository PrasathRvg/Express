var express=require("express");
var router=express.Router();
var students=[];

var students=[
    {
        fullname: 'karthi',
        email: 'kart@mail.com',
        mobile: 1234345,
        clg: 'vgn'
    },
    {
        fullname: 'lokesh',
        email: 'loki@mail.com',
        mobile: 2342342,
        clg: 'vgn'
    },
    {
        fullname: 'kirubakaran',
        email: 'kiru@mail.com',
        mobile: 2342345,
        clg: 'vgn'
    },
    {
        fullname: 'fazil',
        email: 'faz@mail.com',
        mobile: 45246223,
        clg: 'vgn'
    }
]

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

router.get("/studetails/:x",function(req,res){
    var stu=students.filter((e,i)=>{
        if(e.mobile==req.params.x)
        return true
        else
        return false
    })
    res.render("studetails",{
        details:stu
    })
})


// router.get("/studentlist/fulldetails"),function(req,res){
//     res.send("name:"+val.name+"email:"+val.email+"mobile:"+val.mobile)
// }


module.exports=router;