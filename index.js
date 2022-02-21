const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
const expressEJSLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
//to store the session key of the user as on server restart it is getting sign out
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
// app.use(session({
//     secret:'foo',
//     store:MongoStore.create({mongoUrl : 'mongodb://localhost/'})
// }));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressEJSLayouts);
app.use(express.static(__dirname + '/public'));
//avatar path
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));


app.use(session({
    name:'Minchat',
    //change here secret before deployment
    secret:'hellonnfkn',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge : (1000 * 60 * 100)
    },
    store:new  MongoStore(
        {
            mongoUrl:'mongodb://localhost/minchat_posthereDB',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongo setup');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/',require('./routes/index'));




app.listen(port,function(err){
    if(err){
        console.log('Error | Setting up server');
        return;
    }
    console.log('Server connected');
})