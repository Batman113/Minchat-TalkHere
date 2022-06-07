const Post = require('../models/posts');
const UserData = require('../models/users');
module.exports.home = async function(req,res){
    // return res.send('<h1>Express is up</h1>');
    //populating the user before sending thae data
try{
    
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

        // console.log(post);
    let users = await UserData.find({});

    return res.render('home',{
        title:"Minchat | Post Here",
        Posts:posts,
        User:users
    });
}catch(err){
    console.log(err);
    return res.redirect('back');
}

}

module.exports.profile = (req,res) => {
    return res.send('<h1>Profile</h1>');
}

module.exports.links = function(Req,res){
    return res.render('link',{
        title:"Reading Links"
    })
}

