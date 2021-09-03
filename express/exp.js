var http=require("http");
var path=require("path");
var express=require("express");
var student=[];
var app=express();
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.get('/',function(req,res){
    res.send("HelloWorld")
})

app.get('/reg',function(req,res){
    res.sendFile(__dirname+"/registration.html");
})

app.get('/register',function(req,res){
    console.log("req query params data:",req.query)
    student.push(req.query)
    res.render(JSON.stringify(student))
})

app.post('/register',function(req,res){
    console.log("req message body:",req.body)
    res.send("ok")
})

app.listen(8080,function(){
    console.log("listening on 8080");
});





















