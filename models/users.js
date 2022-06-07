const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const avatarPath = path.join('/uploads/users/avatars');
const userDataSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birthDate:{
        type:Date,
        required:true
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',avatarPath))
    },
    filename:function(req,file,cb){
        cb(null,file.filename + '-' + Date.now())
    }
})
//publicily available
userDataSchema.statics.uploadAvatar = multer({storage:storage}).single('avatar');
userDataSchema.statics.avatarPth = avatarPath;
const UserData = mongoose.model('UserData',userDataSchema);

module.exports = UserData;