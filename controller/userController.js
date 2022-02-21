const UserData = require('../models/users');
const flash = require('connect-flash');
// const userData = require('../models/users');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res){
    // return res.send('<em>User Profile</em>');
    UserData.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:"Profile",
            puser:user
        });
    })
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
            detail:UserData
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
            // let password = req.body.password;
            UserData.create(req.body,function(err,user){
                if(err){
                    console.log('Eror in signing user');
                    return;
                }
            // return res.redirect('/user/signIn');
            })
            // req.flash('message','Success');
            return res.redirect('/user/signIn');
        }
        return res.send('<h1>You are already present</h1>');
    })
}


module.exports.loginSession = function(req,res){
    req.flash('success','Logged in');
    return res.redirect('/');
}

module.exports.logOut = function(req,res){
    req.logout();
    req.flash('success','Logged Out');
    return res.redirect('/');
}


module.exports.update = async function(req,res){
    // if(req.params.id == req.user.id){
    //     UserData.findByIdAndUpdate(req.params.id,{
    //         name:req.body.name,
    //         email:req.body.email
    //     },function(err,user){
    //         if(err){
    //             console.log('Error');
    //             return;
    //         }
    //         return res.redirect('back');
    //     })
    // }else{
    //     console.log('Hell');
    //     return res.status(401).send('Unauthrized');
    // }   
    
        if(req.params.id == req.user.id){
            try{
                let user = await  UserData.findById(req.params.id);
                UserData.uploadAvatar(req,res,function(err){
                    if(err){
                        console.log('multer not responding',err);
                        return;
                    }
                    // console.log(req.file);
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file){
                        const existpath = fs.existsSync(path.join(__dirname,'..',user.avatar));
                        if(user.avatar && existpath){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        else{
                            
                        }
                        user.avatar = UserData.avatarPth + '/' + req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
                });

                // return res.redirect('back');
            }catch(err){
                console.log('Error',err);
                return res.redirect('/');
            }
        }
        else{
            console.log('Hell');
            return res.status(401).send('Unauthrized');
        }


}