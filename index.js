const express = require('express');
const port = 8080;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

// for cookie parser
app.use(cookieParser());

// for form
app.use(express.urlencoded());

// setting up express Layouts
app.use(expressLayouts);

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