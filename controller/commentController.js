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

module.exports.destroy = function(req,res){
        Comment.findById(req.query.id,function(err,comment){
            if(err){
                console.log('Error');
                return;
            }
            // console.log(comment.post.user);

            // Post.findById(comment.post,function(err,post){
            //     if(post.user == req.user.id){
            //         let pid = comment.post;
            //         comment.remove();
            //         Post.findByIdAndUpdate(pid,{$pull:{comments:req.query.id}},function(err,post){
            //             return res.redirect('back');
            //         })
            //     }
            // })
            if(comment.user == req.user.id ){
                let postId = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comments:req.query.id}},function(err,post){
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back');
            }
        })
        
}