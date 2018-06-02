const express = require('express');
const path = require('path');

//init app
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home route
app.get('/', function(req, res){
    let articles = [
        {
        id: 1,
        title: 'Article 1',
        author: 'Jessica',
        body: 'This is article one'
        },
        {
        id: 2,
        title: 'Article 2',
        author: 'Brad',
        body: 'This is article two'
        },
        {
        id: 3,
        title: 'Article 3',
        author: 'Jessica',
        body: 'This is article three'
        }
    ];
    res.render('index',{
        title:'Articles',
        articles: articles
    });
});

//Add Route
app.get('/articles/add', function(req,res){
    res.render('add_article',{
        title:'Add Article'
    });
});

//Start Sever
app.listen(3000,function(){
    console.log('Server started on port 3000....');
});