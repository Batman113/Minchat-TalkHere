const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/minchat_posthereDB');


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open',function(){
    console.log("Database conected");
})

module.exports = db;
