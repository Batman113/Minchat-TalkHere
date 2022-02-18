const Post = require('../models/posts');
const UserData = require('../models/users');
module.exports.home = function(req,res){
    // return res.send('<h1>Express is up</h1>');
    //populating the user before sending thae data
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,post){
        if(err){
            console.log(err);
            return;
        }
        // console.log(post);
        UserData.find({},function(err,User){
            return res.render('home',{
                title:"Minchat | Post Here",
                Posts:post,
                User:User
            });
        })
    });
}

module.exports.profile = (req,res) => {
    return res.send('<h1>Profile</h1>');
}

module.exports.links = function(Req,res){
    return res.render('link',{
        title:"Reading Links"
    })
}

