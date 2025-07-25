const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
 
    const {username,password,role} = req.body
    try{

        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashpassword = await bcrypt.hash(password,10)
        const user = await User.create({username,password:hashpassword,role})

    }
    catch(err){

        res.status(500).json({error:error.message});

    }
}
exports.login = async (req,res)=>{
    const {username,password} = req.body;
    try{
        const user = await User.find({username});
        if(!user){
           return  res.status(400).json({message:"User not Found"});
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token  = jwt.sign({userId:user.__id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.json({message:"Login succesfull"});

    }
    catch(err){

        res.status(500).json({error:err.message})

    }
}
