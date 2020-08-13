const express = require('express');
const port = 8080;
const app = express();
const expressLayouts = require('express-ejs-layouts');

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