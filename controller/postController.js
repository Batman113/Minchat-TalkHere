const Post = require('../models/posts');
const Comment = require('../models/comment'); 
module.exports.create = async function (req,res){
    try{
        let post = await Post.create({
        title:req.body.title,
        content:req.body.content,
        user:req.user.id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created"
            })
        }


        return res.redirect('back');
    
    }catch(error){
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.query.id});
           if(req.xhr){
                return res.status(200).json({
                    data:{
                        postId:req.params.id
                    },
                    message:"post deleted"
                })
            }
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        return res.redirect('back');
    }


    // Post.findById(req.params.id,function(err,post){
    //     if(post.user == req.user.id){
    //         post.remove();
    //         Comment.deleteMany({post:req.query.id},function(err){
    //             return res.redirect('back');
    //         })
            
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
}