//Part 4
const express = require('express');
const path = require('path');
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Home Route
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
    //Send message to server
    res.render('index', {
        title: 'Articles',
        articles: articles
    });
});

//Add route
app.get('/articles/add', function(req, res) {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//Run Server on port 3000
app.listen(3000, function () {
    console.log('Server Started on port 3000');
});