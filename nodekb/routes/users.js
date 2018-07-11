const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Bring in User Models
let User = require('../models/user');

//Get Request Register form
router.get('/register', function(req, res){
    res.render('register');
});

//Register Process
router.post('/register',function(req,res){
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const email = req.body.email;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not Match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors: errors
        });
    }
    else{
        let newUser = new User({
            name : name,
            email: email,
            password: password,
            username: username
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        req.flash('Success', 'You are now registered. Login.');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

router.get('/login', function(req,res){
    res.render('login');
});

module.exports = router;