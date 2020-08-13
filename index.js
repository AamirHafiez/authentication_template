const express = require('express');
const port = 8080;

const app = express();

app.listen(port, function(err){
    if(err){
        console.log(`OMG!! The Server couldn't run!! cuz: ${err}`);
        return;
    }
    console.log(`Yipee!! Server is up and running at port: ${port}`);
});