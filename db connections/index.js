var express=require("express");
var app=express();
var {MongoClient,ObjectId} = require('mongodb');
var url = "mongodb://localhost:27017/";

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static(__dirname+"/open"))  

app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html")
})

app.get("/studentregistration",function(req,res){
    res.sendFile(__dirname+"/stureg.html")
})

// app.get("/stds",function(req,res){
//     MongoClient.connect(url,function(err,conn){
//         var db=conn.db("delta");
//         db.collection("students").find().toArray(function(err,data){
//             res.send(data)
//         })
//     })
// })

app.get("/studentdetails",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta");
        db.collection("students").find().toArray(function(err,data){
            res.render("studetails",{
                details:data
            })
        })
    })
})          

app.get("/deletestudent/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta")
        db.collection("students").deleteOne({_id:ObjectId(req.params.id)},function(err,data){
            res.redirect("/studentdetails")
        })
    })    
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
        })
    })
})

app.post("/stureg",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta");
        db.collection("students").insertOne(req.body,function(err,data){
            res.send("registered successfully")
        })
    })
})

app.get("/addWeight/:id",function(req,res){
    res.render("addweight",{
        studentid:req.params.id
    })
})

app.post("/addWeight",function(req,res){
    MongoClient.connect(url,function(err,conn){
        console.log(req.body)
        var db=conn.db("delta")
        db.collection("students").updateOne({_id:ObjectId(req.body.id)},{
            $push:{
                weightEntry:{
                    weight:req.body.weight,
                    date:req.body.date  
                }
            }
        },function(err,data){
            console.log(data)
            res.redirect("/studentdetails")
        })
    })
})

app.listen(9009,function(req,res){
    console.log("Running on 9009")
})