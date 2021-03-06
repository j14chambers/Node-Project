const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

mongoose.connect(config.database);
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

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param,msg, value){
        var namespace = param.split('.')
        ,root = namespace.shift()
        ,formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Passport Config
require('./config/passport')(passport);

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


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

//Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);


//Start Sever
app.listen(3000,function(){
    console.log('Server started on port 3000....');
});