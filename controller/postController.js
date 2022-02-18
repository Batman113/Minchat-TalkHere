const Post = require('../models/posts');
module.exports.create = function (req,res){
    if(req.user._id){
        Post.create({
        title:req.body.title,
        content:req.body.content,
        user:req.user.id
    },function(err,post){
        if(err){
            console.log('Error | Creating post');
            return;
        }
        return res.redirect('back');
    });
    }
    else{
        return res.redirect('back');
    }
}
