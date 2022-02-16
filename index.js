const express = require('express');
const port = 3000;
const app = express();

app.get('/',function(req,res){
    return res.send('<h1>HEllo</h1>');
})








app.listen(port,function(err){
    if(err){
        console.log('Error | Setting up server');
        return;
    }
    console.log('Server connected');
})