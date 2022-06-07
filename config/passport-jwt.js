const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const jwtStrategy = require('passport-jwt').Strategy;
const extractStrategy = require('passport-jwt').ExtractJwt;
const User = require('../models/users');


let opts = {
    jwtFromRequest:extractStrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey:'minchat'//encryption and decryption key,

}

passport.use(new jwtStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){console.group('erro in jwt');return;}
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))

module.exports = passport;