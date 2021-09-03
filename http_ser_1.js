var http=require("http");
http.createServer((request,response)=>
{
    response.setHeader("Content-Type","text/html");
    console.log("request received");
    // response.write("<h1>HelloWorld</h1>");
    response.write("<h3>HelloWorld</h3>");  
    response.end();
}).listen(3000)
