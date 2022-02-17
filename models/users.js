const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    birthDate:{
        type:Date,
        required:true
    }
},{
    timestamp:true
});

const UserData = require('UserData',userDataSchema);

module.exports = UserData;