var express=require("express");
var app=express();
var {MongoClient,ObjectId} = require('mongodb');
var multer=require("multer");
var path=require("path");
// var upload=multer({dest:"uploads/"})
var url = "mongodb://localhost:27017/";

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static(__dirname+"/uploads"))  

const storage=multer.diskStorage({destination:function(req,file,cb){
    cb(null,__dirname+"/uploads")
    },
    filename:function(req,file,cb){
    console.log("file in filename function::",file);
    var fileext=path.extname(file.originalname);
    const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1E9)
    cb(null,file.fieldname+'-'+uniqueSuffix+fileext)
    }
})

const upload=multer({storage:storage})

app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.get("/regform",function(req,res){
    res.sendFile(__dirname+"/regform.html")
})

// app.post("/studentprofile",upload.single("ProfilePic"),function(req,res){
//     res.send("wait");
// })

app.post("/studentprofile",upload.single("profilepic"),function(req,res){
    console.log("req.file",req.file);
    req.body.profilepic=req.file.filename;
    console.log("req.body",req.body);
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta");
        db.collection("students").insertOne(req.body,function(err,data){
            res.send("wait")
        })
    })
})

app.get("/updateprofile/:id",function(req,res){
    res.render("updateform",{
        studentid:req.params.id
    })
})

app.post('/updateprofile',upload.single('profilepic'),(req,res) => {
    MongoClient.connect(url,(err,conn) => {
        var db = conn.db('merit');
        db.collection('student')
        .updateOne(
            {_id : ObjectId(req.body.id)},
            {$set: {profilepic : req.file.filename}},
            (err,data) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    res.redirect(`/studentdetails/${req.params.id}`);
                }
        });
    });
})

app.get("/studentnamelist",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta");
        db.collection("students").find().toArray(function(err,data){
            res.render("stunamelist",{
                details:data
            })
        })
    })
})

app.get("/studentnamelist/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta");
        db.collection("students").find({_id:ObjectId(req.params.id)}).toArray(function(err,data){
            res.render("studetails",{
                details:data
            })
            console.log(data)
        })
    })
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html")
})

app.listen(8008,function(req,res){
    console.log("Running on 8008");
})