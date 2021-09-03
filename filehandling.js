//synchronous read

var fs=require("fs");
var data=fs.readFileSync("sample.txt");
console.log(data.toString());
console.log("the end...")    

//asynchronous read

var fs=require("fs");
var data=fs.readFile("sample.txt",(err,data)=>
{
    console.log(data.toString());
})
console.log("the end...")
