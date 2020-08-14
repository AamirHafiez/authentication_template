const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'OMG!! Error connecting to MongoDb'));

db.once('open', function(){
    console.log('Yay!! Connected to Database::MongoDb');
});

module.exports = db;