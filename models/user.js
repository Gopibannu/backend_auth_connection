const mongoose = require('mongoose');
const { type } = require('os');
const { setThePassword } = require('whatwg-url');
const userSchema =new  mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user','manager'],
        default:'user'
    }
});
module.exports = mongoose.model('User',userSchema);

