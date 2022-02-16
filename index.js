const express = require('express');
const path = require('path');
const port = 3000;
const app = express();

app.set('views engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use('/',require('./routes/index'));







app.listen(port,function(err){
    if(err){
        console.log('Error | Setting up server');
        return;
    }
    console.log('Server connected');
})