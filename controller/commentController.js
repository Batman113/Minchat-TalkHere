const Comment = require('../models/comment');
const Post = require('../models/posts');
module.exports.create = function(req,res){
    console.log(req.user,"Heelloo");
    Post.findById(req.body.post,function(err,post){
        if(post){
                Comment.create({
        content:req.body.content,
        user:req.user._id,
        post:req.body.post
    },function(err,commnet){
        if(err){
            console.log(err);
            return;
        }
        post.comments.push(commnet);
        post.save();
        return res.redirect('/');
    })
        }
    })

}