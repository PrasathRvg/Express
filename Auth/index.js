var express=require("express");
var app=express();
var {MongoClient} = require('mongodb');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const url = "mongodb://localhost:27017/";

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html")
})

app.get("/registerform",function(req,res){
    res.sendFile(__dirname+"/registerform.html")
})

app.get("/loginform",function(req,res){
    res.sendFile(__dirname+"/loginform.html")
})

var authenticate=function(req,res,next){
    console.log("inside the function")
    console.log("req.sess::",req.session)
    console.log("session email::",req.session.email)
    if(req.session.email){
        MongoClient.connect(url,function(err,conn){
            var db=conn.db("delta");
            db.collection("users").find({email:req.session.email})
            .toArray(function(err,data){
                console.log(data)
                if(data[0].pass===req.session.pass){
                    next()
                }
                else{
                    // res.send("login first and come again")
                    res.redirect("/loginform")
                }
            })
        })
    }
    else{
        res.redirect("/loginform")
    }
}

app.get("/productform",authenticate,function(req,res){
    res.render("product")
})

app.get("/salesform",authenticate,function(req,res){
    console.log("req cookies for product req::",req.session.email)
    res.render("sales")
})

app.post("/register",function(req,res){
    console.log("req fields",req.body)
    if(req.body.pass!==req.body.cpass){
        res.sendFile(__dirname+"/registerpassnotmatch.html")
    }
    else{
        MongoClient.connect(url,function(err,conn){
            var db = conn.db("delta");
            db.collection("users").find({email:req.body.email})
            .toArray(function(err,data){
                if(data.length===0){
                    db.collection('users').insertOne(req.body,function(err,data){
                        res.send("Registered Successfully")
                    })                    
                }
                else{
                    res.sendFile(__dirname+"/registeruserexist.html");                    
                }
            })
        })
    }
})

// app.post("/register",function(req,res){
//     console.log(req.body)
//     MongoClient.connect=(url,function(err,conn){
//         var db=conn.db("delta")
//         db.collection("users").insertOne(req.body,function(err,data){
//             console.log("inside db")
//             if(req.body.pass!==req.body.cpass){
//                 res.sendFile(__dirname+"/registerpassnotmatch.html")
//             }
//             else{
//                 db.collection("users").find({email:req.body.email}).toArray(function(err,data){
//                     if(data.length!==0){
//                         res.sendFile(__dirname+"/registeruserexist.html")
//                     }
//                     else{
//                         res.send("successfully registered")
//                     }
//                 })
//             }
//         })
//     })
// })

app.post("/login",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta");
        db.collection("users").find({email:req.body.email})
        .toArray(function(err,data){
            if(data.length===0){
                res.sendFile(__dirname+"/logindoesntexist.html")
            }
            else{
                if(data[0].pass===req.body.pass){
                    // res.cookie("email",req.body.email);
                    // res.cookie("pass",req.body.pass);
                    req.session.email=req.body.email;
                    req.session.pass=req.body.pass
                    res.send("Login Successfull")
                }
                else{
                    res.sendFile(__dirname+"/loginwrongpass.html")
                }
            }
        })
    })
})


// app.post("/login",function(req,res){
//     MongoClient.connect(url,function(err,conn){
//         var db = conn.db("delta");
//         db.collection("users").find({email:req.body.email})
//         .toArray(function(err,data){
//             if(data.length===0){
//                 res.sendFile(__dirname+"/logindoesntexist.html")               
//             }
//             else{
//                 if(data[0].pwd===req.body.pwd){
//                     res.cookie("email",req.body.email);
//                     res.cookie("pass",req.body.pass);
//                     res.send("login successful")
//                 }  
//                 else{
//                     res.send("Incorrect password or username")
//                 }          
//             }
//         })
//     })
// })

app.listen(9080,function(req,res){
    console.log("Running on 9080")
})