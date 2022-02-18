const Post = require('../models/posts');
module.exports.home = function(req,res){
    // return res.send('<h1>Express is up</h1>');
    Post.find({},function(err,post){
        if(err){
            console.log(err);
            return;
        }
        console.log(post);
        return res.render('home',{
        title:"Minchat | Post Here",
        Posts:post
    });
    })
}

module.exports.profile = (req,res) => {
    return res.send('<h1>Profile</h1>');
}

module.exports.links = function(Req,res){
    return res.render('link',{
        title:"Reading Links"
    })
}

