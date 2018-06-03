const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check connection
db.once('open',function(){
    console.log('Connected to Mongodb');
});
//check for db errors
db.on('error', function(){
    console.log(err);
    
});
//init app
const app = express();

//Bring in Models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());


//Home route
app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{
                title:'Articles',
                articles: articles
            });
        }
        
    });
});

//Add Route
app.get('/articles/add', function(req,res){
    res.render('add_article',{
        title:'Add Article'
    });
});

//add Submit POST Route
app.post('/articles/add', function(req,res){
    //console.log('Submitted');
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
   // console.log(req.body.title);

   article.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           res.redirect('/');
       }
   });
});

//Start Sever
app.listen(3000,function(){
    console.log('Server started on port 3000....');
});