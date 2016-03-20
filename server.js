/* 
|----blog.json
|----index.js
|---public
|	|---image
|	|---js file
|	|---cs file
|
|---blog_route
	|--- blog/:id:
	|--- Projects
	|---about

 */
 
var express= require('express');
var fs = require("fs");
var util = require('util');

var db=require("./db")


//create server
var app = express();
//function
app.use('/static', express.static('public')); //the first augrument is the virtual directory 
app.use('/css',express.static('css'));
app.use ('/build',express.static('build'));
app.use('/js',express.static('js'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//select  one blog
app.get('/',function(request, response) {
    response.sendFile(__dirname + '/index.html');
});
app.get('/blog/:id',function(request,response){
    var blogID=request.params.id;
    db.find_db(blogID,response);
    
    
});

//list all blog
app.get('/blog',function(request,response){

	 db.find_db(null,response);
  
    
});

//test
app.get('/test',function(request,response){
    db.list_all();
})

app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT, process.env.OPENSHIFT_NODEJS_IP || process.env.IP, function(){
  var addr = "127.00.0.1";
  console.log("Chat server listening at", process.env.IP + ":" +process.env.PORT);
});