const express = require('express');
const port = 8080;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const nodemailer = require('nodemailer');
const sassMiddleware = require('node-sass-middleware');
const randomstring = require('randomstring');

// for sass
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// assets middleware (setting up static files)
app.use(express.static('./assets'));

// for cookie parser
app.use(cookieParser());

// for form
app.use(express.urlencoded());

// setting up express Layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// used for session
app.use(session({
    name: 'auth_cookie',
    secret: 'qwerty',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 10)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb is OK');
    })
}));
app.use(passport.initialize());
app.use(passport.session());

//routing middleware
app.use('/', require('./routes'));

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`OMG!! The Server couldn't run!! cuz: ${err}`);
        return;
    }
    console.log(`Yipee!! Server is up and running at port: ${port}`);
});