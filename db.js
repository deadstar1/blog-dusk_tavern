var mongoose = require('mongoose');
var mongodb = require("mongodb")
mongoose.connect('mongodb://deadstar1-blog-2320247:27017/admin');
//create a new schema.
var Schema = new mongoose.Schema({
    content:String,
    date:String,
    description:String,
    title:String,
});
//create new model
var Blog=mongoose.model('blog',Schema);

//find
function find_db(blog_id,response){
    var entry={
        }
        
    
    if(blog_id!=null)
    {
        try {
            var objectId=new mongodb.ObjectID(blog_id);
            console.log(objectId)
            entry={
            '_id':objectId
                
            }
        }
        catch(err){
            response.header("Access-Control-Allow-Origin","*");
            response.header("Content-Type","application/json");
            response.status(500).send('<h1>Holy shit! mother of errors</h1>');
            return null;
            
        }

        
    }
    //
    Blog.find(entry,function(err,data){
        if(err){
           // console.error(err);
            response.header("Access-Control-Allow-Origin","*");
            response.header("Content-Type","text/xml");
            response.status(500).send('Something broke!');
        }
        else{
            response.header("Access-Control-Allow-Origin","*");
            response.header("Content-Type","application/json");
            console.log(entry);
            console.log(data);
            response.send(data);
            }
    });
}
function list_all(){
    var entry={
        'title':'Hack'
    }
    Blog.find(entry,function(err,data){
        if(err){
            return console.log('err')
        }
        else {
        console.log('testz'+data);}
    });
}
exports.find_db=find_db;
exports.list_all=list_all;