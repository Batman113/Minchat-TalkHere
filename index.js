const express = require('express');
const path = require('path');
const expressEJSLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const port = 3000;
const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(expressEJSLayouts);
app.use(express.static(__dirname + '/public'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes/index'));







app.listen(port,function(err){
    if(err){
        console.log('Error | Setting up server');
        return;
    }
    console.log('Server connected');
})