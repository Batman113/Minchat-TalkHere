const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){


    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    return res.json(200,{
        message:"List of post",
        post:posts
    })
}


module.exports.delete = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);
    post.remove();
    await Comment.deleteMany({post:req.params.id});
    return res.json(200,{
        message:"Deleted success"
    })
    }catch(err){
        console.log(err);
    }

}