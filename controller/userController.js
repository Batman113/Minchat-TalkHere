module.exports.profile = function(req,res){
    // return res.send('<em>User Profile</em>');
    return res.render('profile',{
        title:"Profile"
    })
}

module.exports.post = function(req,res){
    return res.send('<h1>Hello</h1>');
}