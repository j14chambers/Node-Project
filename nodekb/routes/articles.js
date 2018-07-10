const express = require('express');
const router = express.Router();


//Bring in Models
let Article = require('../models/article');




//Load Edit Form
router.get('/edit/:id', function(req,res){
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article',{
            title: 'Edit Article',
            article:article
        });
    });
});

//Add Route
router.get('/add', function(req,res){
    res.render('add_article',{
        title:'Add Article'
    });
});

//add Submit POST Route
router.post('/add', function(req,res){
    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('author', 'Author is Required').notEmpty();
    req.checkBody('body', 'Body is Required').notEmpty();

    //Get Errors
    let errors = req.validationErrors();

    if(errors){
        res.render('add_article',{
            title: 'Add Article',
            errors: errors
        });
    }
    else{
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
            req.flash('success', 'Article Added');
            res.redirect('/');
        }
        });
    }
    
});

//Update Submit POST Route
router.post('/edit/:id', function(req,res){

    let article = {}
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

   Article.update(query, article, function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success','Article Update');
           res.redirect('/');
       }
   });
});
//Delete Article
router.delete('/:id', function(req, res){
    let query = {_id:req.params.id}

    Article.remove(query, function(err){
        if (err) {
            console.log(err);
        }
        res.send('Success');
    });
});

//Get single article
router.get('/:id', function(req,res){
    Article.findById(req.params.id, function(err, article){
        console.log(article);

        res.render('article',{
            article:article
        });
    });
});

module.exports = router;