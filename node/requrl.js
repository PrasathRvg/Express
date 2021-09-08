var http=require("http");
var fs=require("fs");
var path=require("path");
http.createServer((request,response)=>{
    var filename=path.basename(request.url);
    console.log("request received",path.basename(request.url));
    response.setHeader('Content-Type','text/html')
    fs.readFile(filename,(err,data)=>{
        if(err)
        {
            response.write("No file in this name");
        }
        else
        {
            response.write(data.toString());
        }
        response.end();
    })
}).listen(3000)