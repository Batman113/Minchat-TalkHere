const userData = require('../models/users');
module.exports.profile = function(req,res){
    // return res.send('<em>User Profile</em>');
    return res.render('profile',{
        title:"Profile"
    })
}

module.exports.post = function(req,res){
    return res.send('<h1>Hello</h1>');
}

module.exports.logIn = function(req,res){
    return res.render('logIn',{
        title:"Sign in",
        detail:userData
    });
}
module.exports.signUp = function(req,res){
    return res.render('signUp',{
        title:"Sign Up"
    })
}