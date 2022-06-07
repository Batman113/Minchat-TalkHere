const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserData = require('../models/users');
//tell the passport to use this strategy
passport.use(new LocalStrategy({
    usernameField :'email' //syntax user name field as email is the unique one
    },
    function(email,password,done){
        //user finding and establishing identity
        UserData.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user');
                return done(err);
            }  
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);
            } 
            return done(null,user);
        });
    }
))
//to decide which thing to put in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    UserData.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user | passport local');
            return done(err);
        }
        return done(null,user);
    });
});

//check user is authenticated or not
//used as middleware
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){//user is signed in
        return next();//go to next function
    }
    //if user is not signed in
    return res.redirect('/user/signIn');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //transeferring to res locals
        /*
        req.user contain the user info from session cookie 
        and here we are transferring that info to 
        res.locals
         */
        res.locals.user = req.user;
        
    }
    next();
}

module.exports = passport;