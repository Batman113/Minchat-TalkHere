module.exports.home = function(req,res){
    // return res.send('<h1>Express is up</h1>');
    return res.render('home',{
        title:"Minchat | Post Here"
    });
}

module.exports.profile = (req,res) => {
    return res.send('<h1>Profile</h1>');
}

