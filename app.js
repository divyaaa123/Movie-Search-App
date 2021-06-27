var express= require("express");
var request= require("request");
var app= express();
require('dotenv').config()
app.set('view engine','ejs');
app.use(express.static("public"));
app.get("/",function (req,res) {
    res.render('search');
})
app.get("/results",function (req,res) {
    let query = req.query.search;

    var key = process.env.API_KEY;
    let url ="http://www.omdbapi.com/?i=tt3896198&apikey="+key+"&s="+ query;
    console.log(url);
    if (query === ""){ 
        res.render("error");
    }
    else{
        request(url,function(error,response,body){
              if(!error && response.statusCode === 200){
                var parsedData = JSON.parse(body);
                if(parsedData.Response=="False")
                res.render('error');
                else
                res.render('results', {data: parsedData})
            }
        })
    }
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server Listening on port 3000");
})