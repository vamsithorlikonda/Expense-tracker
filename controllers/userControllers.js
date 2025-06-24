const express=require('express');
const bcrypt=require('bcryptjs')
const User=require('../models/userModels')
const jwt=require('jsonwebtoken')
const userRegister=async(req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email ||!password){
        throw new Error("All fields are mandatory")
    }
    const isExistingEmail = await User.findOne({ email });
        if (isExistingEmail) {
            throw new Error("This email is already registered.");
                }

    const isExistingUsername = await User.findOne({ username });
        if (isExistingUsername) {
            throw new Error("This username is already taken.");
                }
    const hashedPassword=await bcrypt.hash(password,10)
    const user= await User.create({
            username,
            email,
            password:hashedPassword
        })
    res.status(201).json({
    message: "User successfully registered",
    username: user.username,
    email: user.email
})};

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken=jwt.sign({
            user:{
                id:user._id,
                username:user.username,
                email:user.email}},
            process.env.SERCET_KEY,
            {expiresIn:"30m"})
        res.json({message:"user successfully logined",
        id:user.id,
        username:user.username,
        email:user.email,
        accessToken})
    }
    else{
        throw new Error(" Invalid creditanals")
    }
}

const userCurrent=async(req,res)=>{
    const user=await User.findById(req.user.id).select("-password");
    
    res.json({user})
}
module.exports={userRegister:userRegister,userLogin:userLogin,userCurrent:userCurrent}