const Post = require('../models/posts');
const Comment = require('../models/comment'); 
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

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.query.id},function(err){
                return res.redirect('back');
            })
            
        }else{
            return res.redirect('back');
        }
    });
}