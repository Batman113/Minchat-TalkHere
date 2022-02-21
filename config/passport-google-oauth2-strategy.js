const passport = require('passport');
const passportgoogleOauth = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/users');
passport.use(new passportgoogleOauth({
    clientID:'722049517839-k4v8d22gjt7a2026nga3h1cjgtpuc326.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:"http://localhost:3000/user/auth/google/callback"    
},
    function( accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function( err,user){
            if(err){
                console.log('Error in signing through google');
                return;
            }
            console.log(accessToken,refreshToken);
            console.log(profile);
            if(user){
                return done(null,user);
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating user');
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
))

module.exports = passport;