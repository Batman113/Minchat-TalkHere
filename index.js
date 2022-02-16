const express = require('express');
const port = 3000;
const app = express();

app.use('/',require('./routes/index'));







app.listen(port,function(err){
    if(err){
        console.log('Error | Setting up server');
        return;
    }
    console.log('Server connected');
})