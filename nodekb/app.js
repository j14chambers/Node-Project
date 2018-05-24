//Part 4
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check for db errors
db.once('open', function(){
    console.log('connected to mongodb');
});

//Check for db errors
db.on('error', function(err){
    console.log(err);
});


//int app
const app = express();

//Bring in models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//body parse Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set Public folder
app.use(express.static(path.join(__dirname, 'public')));


//Home Route
app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        
        if(err){
            console.log(err);
        }
        else{
            // article db to loop on index.pug
            //Send message to server
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
        
    });
});

//Add Route
app.get('/articles/add', function(req, res) {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//Add Submit POST Route
app.post('/articles/add', function(req, res){
    //console.log('submitted');
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    
    //console.log(req.body.title);
    //return;
    article.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});

//Run Server on port 3000
app.listen(3000, function () {
    console.log('Server Started on port 3000');
});