const UserData = require('../models/users');
const userData = require('../models/users');
module.exports.profile = function(req,res){
    // return res.send('<em>User Profile</em>');
    return res.render('profile',{
        title:"Profile"
    });
}

module.exports.post = function(req,res){
    return res.send('<h1>Hello</h1>');
}

module.exports.logIn = function(req,res){
  if(req.isAuthenticated()){
        return res.redirect("back");
    }

        return res.render('logIn',{
            title:"Sign in",
            detail:userData
        });
}
module.exports.signUp = function(req,res){

     if(req.isAuthenticated()){
        return res.redirect('/');
    }

     return res.render('signUp',{
        title:"Sign Up"
    })

}


module.exports.create = function(req,res){
    if(req.body.password != req.body.cpassword){
        return res.redirect('back');
    }
    UserData.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Eror in finding user');
            return;
        }
        if(!user){
            UserData.create(req.body,function(err,user){
                if(err){
                    console.log('Eror in signing user');
                    return;
                }
            // return res.redirect('/user/signIn');
            })
            return res.redirect('/user/signIn');
        }
        return res.send('<h1>You are already present</h1>');
    })
}


module.exports.loginSession = function(req,res){
    return res.redirect('/');
}

module.exports.logOut = function(req,res){
    req.logout();
    return res.redirect('/');
}