const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'UserData'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]  
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;